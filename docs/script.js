const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

// Sayfa yüklendiğinde local storage'dan verileri geri yükle
document.addEventListener('DOMContentLoaded', (e) => {
    loadFromLocalStorage();
    calculateTotal();
});

container.addEventListener('click', function(e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change', function(e){
    calculateTotal();
});

function calculateTotal(){
    const selectedSeats = container.querySelectorAll('.seat.selected');
    
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
    localStorage.setItem('selectedMoviePrice', select.value);

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;
}

function loadFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    if (selectedMovieIndex !== null) {
        select.selectedIndex = selectedMovieIndex;
    }

    if (selectedMoviePrice !== null) {
        select.value = selectedMoviePrice;
    }
}
