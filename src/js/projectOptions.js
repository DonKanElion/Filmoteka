// Pagination options
export const paginationOptions = {
  totalItems: 1,
  itemsPerPage: 5,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn tui-pagination__page" >{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',

    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyAn297t6wFnJi_69pjCpLB-_9nu_ZR0ZSA',
  authDomain: 'filmoteka-c2e3b.firebaseapp.com',
  projectId: 'filmoteka-c2e3b',
  storageBucket: 'filmoteka-c2e3b.appspot.com',
  messagingSenderId: '416831022900',
  appId: '1:416831022900:web:19ddd479599d46f227e761',
};
