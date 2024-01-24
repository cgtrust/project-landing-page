// Navigation toggle
const button = document.getElementById(
    'menu-toggle'
);
const links = document.getElementById(
    'header-menu'
);

button.addEventListener( 'click', function() {
    links.classList.toggle( 'toggled' );
} );

