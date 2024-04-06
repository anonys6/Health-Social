document.querySelector('.form').addEventListener('submit', function(e) {
    e.preventDefault();

    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;

    if(height && weight) {
        var bmi = (weight / ((height / 100) ** 2)).toFixed(2);
        document.querySelector('.bmi--result').textContent = 'Your BMI result: ' + bmi;
    } else {
        alert('Please enter both your height and weight.');
    }
});