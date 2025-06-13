
const Check = require('../models/check');
const axios = require('axios');

exports.getAllChecks = async (req, res) => {
  try {
    const checks = await Check.find({ userId: req.user.id });
    res.json(checks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error3');
  }
};

exports.addCheck = async (req, res) => {
  try {
    const {
      Pregnancies,
      Glucose,
      BloodPressure,
      SkinThickness,
      Insulin,
      BMI,
      DiabetesPedigreeFunction,
      Age
    } = req.body;

    console.log('Incoming req.body:', req.body);

    // Call the ML prediction API
    const mlResponse = await axios.post('https://vano00-diateksi.hf.space/predict', {
      Pregnancies,
      Glucose,
      BloodPressure,
      SkinThickness,
      Insulin,
      BMI,
      DiabetesPedigreeFunction,
      Age
    });

    const { prediction, risk_percentage } = mlResponse.data;

    // Determine risk category based on percentage
    let riskCategory = 'low';
    if (risk_percentage > 70) {
      riskCategory = 'high';
    } else if (risk_percentage > 50) {
      riskCategory = 'medium';
    }

    // Save check to DB
    const check = new Check({
      userId: req.user.id,
      pregnancies: Pregnancies,
      glucose: Glucose,
      bloodPressure: BloodPressure,
      skinThickness: SkinThickness,
      insulin: Insulin,
      bmi: BMI,
      diabetesPedigree: DiabetesPedigreeFunction,
      age: Age,
      result: prediction === 1 ? 'positive' : 'negative',
      risk: risk_percentage,
      riskCategory
    });

    await check.save();

    res.status(201).json(check);
  } catch (err) {
    if (err.response) {
      console.error('ML API error:', err.response.status, err.response.data);
    } else if (err.request) {
      console.error('ML API no response:', err.request);
    } else {
      console.error('Server error4:', err.message || err);
    }
    res.status(500).send('Server error5');
  }
};

exports.deleteAllChecks = async (req, res) => {
  try {
    await Check.deleteMany({ userId: req.user.id });
    res.json({ msg: 'All checks deleted' });
  } catch (err) {
    console.error("ML prediction or DB save error:", err.response?.data || err.message || err);
    res.status(500).send('Server error6');
  }
};

/*
const Check = require('../models/check');

exports.getAllChecks = async (req, res) => {
  try {
    const checks = await Check.find({ userId: req.user.id });
    res.json(checks);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.addCheck = async (req, res) => {
  try {
    const {
      age, bmi, glucose, pregnancies,
      insulin, bloodPressure, skinThickness,
      diabetesPedigree
    } = req.body;

    // Calculate risk score (you can change the formula)
    const risk = (
      (glucose * 0.3) +
      (bmi * 0.2) +
      (bloodPressure * 0.1) +
      (skinThickness * 0.1) +
      (insulin * 0.1) +
      (diabetesPedigree * 10) +
      (age * 0.1) +
      (pregnancies * 1)
    );

    // Determine risk category
    let riskCategory = 'low';
    if (risk > 70) {
      riskCategory = 'high';
    } else if (risk > 40) {
      riskCategory = 'medium';
    }

    const check = new Check({
      userId: req.user.id,
      age,
      bmi,
      glucose,
      pregnancies,
      insulin,
      bloodPressure,
      skinThickness,
      diabetesPedigree,
      risk,
      riskCategory
    });

    await check.save();
    res.status(201).json(check);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.deleteAllChecks = async (req, res) => {
  try {
    await Check.deleteMany({ userId: req.user.id });
    res.json({ msg: 'All checks deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

*/
