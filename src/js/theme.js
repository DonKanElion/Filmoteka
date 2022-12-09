const theme = 'FilmotekaTheme';
const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', onTheme);
themeSwitcher();

function themeSwitcher() {
  if (localStorage.getItem(theme))
    checkbox.checked = JSON.parse(localStorage.getItem(theme));
  checkbox.dispatchEvent(new Event('change'));
}

function onTheme() {
    if (
        !document.body.classList.contains(
            'dark',
            'gallery__item-title--isDarkTheme'
      
    ) &&
    checkbox.checked
  ) {
        document.body.classList.add('dark', 'gallery__item-title--isDarkTheme');
  }
  if (
    document.body.classList.contains(
      'dark',
      'gallery__item-title--isDarkTheme'
    ) &&
    !checkbox.checked
  ) {
    document.body.classList.remove('dark', 'gallery__item-title--isDarkTheme');
  }

  localStorage.setItem(theme, checkbox.checked);
}
