// Function to calculate determinant
function calculateDeterminant() {
    var matrixString = document.getElementById('matrixInput').value;
    var matrixRows = matrixString.trim().split('\n');
    var matrix = matrixRows.map(row => row.trim().split(/\s+/).map(Number));

    var determinant = getDeterminant(matrix);
    document.getElementById('result').innerText = 'Determinan: ' + determinant;
}

// Function to calculate determinant of a matrix
function getDeterminant(matrix) {
    var n = matrix.length;
    if (n !== matrix[0].length) {
        return 'Matriks harus persegi';
    }
    if (n === 1) {
        return matrix[0][0];
    }
    if (n === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    var determinant = 0;
    for (var j = 0; j < n; j++) {
        var minor = [];
        for (var i = 1; i < n; i++) {
            minor.push(matrix[i].slice(0, j).concat(matrix[i].slice(j + 1)));
        }
        determinant += (j % 2 === 0 ? 1 : -1) * matrix[0][j] * getDeterminant(minor);
    }
    return determinant;
}

// Function to show/hide sections based on hash change
function showSection() {
    var sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        if ('#' + section.id === window.location.hash) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Show initial section based on hash or default to kalkulator
window.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash === '') {
        window.location.hash = '#kalkulator';
    }
    showSection();
});

// Listen for hash change and show respective section
window.addEventListener('hashchange', showSection);

// Add click event listener to calculate button with animation
document.getElementById('calculateButton').addEventListener('click', function() {
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 100);
    calculateDeterminant();
});
