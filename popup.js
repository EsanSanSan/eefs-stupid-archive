document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('myButton');
    const popup = document.getElementById('popup');

    // Open popup when invisible button is clicked
    button.addEventListener('click', () => {
        popup.classList.add('show'); // fade in
    });

    // Close popup when clicking outside the popup box AND not on the button
    document.addEventListener('click', (e) => {
        if (
            popup.classList.contains('show') && // only if popup is open
            !e.target.closest('.popup-content') && // not inside popup box
            e.target !== button // not the button
        ) {
            popup.classList.remove('show'); // fade out
        }
    });
});
