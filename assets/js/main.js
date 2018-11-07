import {
  generateRandomPoster,
  store
} from './figures.js'

(function () {

  'use strict';

  const Helpers = {
    data: [],

  };

  const UI = setupUI();
  UI.init();

  var App = setupApp(UI);

  function setupUI() {

    const posterTemplate = `<div class="poster-container">
              <div class="poster" rel='js-poster-description'>
                
              </div>
            </div>`;
    //define here the templates, eg const a = '<div>hello</div>'
    let $posterContainer;
    let $mainPosterContainer;
    let $posterDescription;
    //define here the variables linked to the view

    //define here the variables internal to this function

    const publicAPI = {
      init: initUI,
      addPosterToList,
      render
    };

    return publicAPI;

    // ***************

    function initUI() {
      // console.log('[setupUI] starting initUI')

      $posterContainer = document.querySelector("#main-grid");
      $mainPosterContainer = document.querySelector("#main-poster");
      // console.log(style.getPropertyValue('color-font-general'));
      $posterDescription = $posterContainer.querySelector("js-poster-description");

      // console.log($posterContainer);
    }

    function addPosterToList(selector, poster) {

      let temp = poster.toObject();
      let $el = document.querySelector(selector);
      let structures;

      var $poster = parentAppendChildStr($el, posterTemplate);


      var globalStyle = getComputedStyle(document.body);
      var squareSz = globalStyle.getPropertyValue('--art-unit-sz');

      if (temp.parentClassList) {
        for (let i = 0; i < temp.parentClassList.length; i++) {
          $poster.classList.add(temp.parentClassList[i]);
        }
      }

      $poster.children[0].classList.add(temp.className);
      $poster.children[0].setAttribute('js-poster-columns', temp.columns);
      $poster.children[0].setAttribute('js-poster-rows', temp.rows);

      $poster.children[0].style.gridTemplateRows = 'repeat(' + temp.rows + ', ' + squareSz + ')';
      $poster.children[0].style.gridTemplateColumns = 'repeat(' + temp.columns + ', ' + squareSz + ')';
      // $poster.children[0].style.border = "2px solid red";
      $poster.setAttribute('data-poster-id', temp.id);
      $poster.setAttribute('js-poster-description', temp.description);

      structures = createImageFromPanel($poster.children[0], temp.data);
      structures = parentAppendChildStr($poster.children[0], structures);
    }

    function render(selector, poster) {
      let temp = poster.toObject();
      let $el = document.querySelector(selector);
      let structures;

      var $poster = parentAppendChildStr($el, posterTemplate);

      var globalStyle = getComputedStyle(document.body);
      var squareSz = globalStyle.getPropertyValue('--art-unit-sz');

      if (temp.classList) {
        for (let i = 0; i < temp.classList.length; i++) {
          $poster.children[0].classList.add(temp.classList[i]);
        }
      }

      if (temp.parentClassList) {
        for (let i = 0; i < temp.parentClassList.length; i++) {
          $poster.classList.add(temp.parentClassList[i]);
        }
      }

      $poster.children[0].setAttribute('js-poster-columns', temp.columns);
      $poster.children[0].setAttribute('js-poster-rows', temp.rows);

      $poster.children[0].style.gridTemplateRows = 'repeat(' + temp.rows + ', ' + squareSz + ')';
      $poster.children[0].style.gridTemplateColumns = 'repeat(' + temp.columns + ', ' + squareSz + ')';
      // $poster.children[0].style.border = "2px solid red";
      $poster.setAttribute('data-poster-id', temp.id);
      $poster.setAttribute('js-poster-description', temp.description);

      structures = createImageFromPanel($poster.children[0], temp.data);
      structures = parentAppendChildStr($poster.children[0], structures);
    }

    function parentAppendChildStr(parent, html) {
      if (!parent)
        return;
      if (!html)
        return;
      let numberOfChilds = parent.childNodes.length;

      let frag = document.createDocumentFragment(),
        temp = document.createElement('div');

      temp.innerHTML = html;

      while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }

      parent.appendChild(frag);

      if (numberOfChilds + 1 == parent.childNodes.length) {
        return parent.childNodes[numberOfChilds];
      }

    }

    function createImageFromPanel(parent, data) {
      if (!parent)
        return;

      let templateArr = [];

      templateArr = data.map(e => `<div class="${e.format + ' ' + e.color}"></div>`);

      return templateArr.toString().split(',').join('');
    }

  }

  // ****************************************************************
  // ****************************************************************

  function setupApp(UI) {
    var posters = [];

    var publicAPI = {
      addPoster,
      render
    };

    return publicAPI;

    // ***************

    function addPoster(selector, specs) {
      var poster = PPoster(specs);
      posters.push(poster);

      UI.addPosterToList(selector, poster);
    }

    function render(selector, specs) {
      var poster = PPoster(specs);
      posters.push(poster);

      UI.render(selector, poster);
    }

  }

  // ****************************************************************
  // ****************************************************************


  function PPoster(struct) {

    let spec = constructor(struct);

    function constructor(struct) {
      let randId = Math.floor(Math.random() * 1000);

      if (!struct) return {
        id: randId,
        name: 'noname',
        description: 1,
        columns: 2,
        rows: 2,
        className: '',
        classList: [],
        parentClassList: [],
        data: [],
      }

      // pulling wanted attributes
      let {
        id = randId,
          name = 'noname',
          description = 1,
          columns = 2,
          rows = 2,
          className = '',
          classList = [],
          parentClassList = [],
          data = [],
      } = struct;

      return {
        id,
        name,
        description,
        columns,
        rows,
        className,
        classList,
        parentClassList,
        data
      };

    }

    const publicAPI = Object.freeze({
      spec,
      age,
      doubleAge,
      timesUp,
      dropAllClasses,

      toObject
    });

    return publicAPI;


    //implementation of public methods
    function dropAllClasses() {
      spec.classes = [];
    }

    function timesUp() {
      dropAllClasses();
      return spec;
    }

    function doubleAge() {
      return spec.age * 2
    };


    function age() {
      return readyOnly(spec.age);
    };

    function toObject() {
      return readyOnly(spec);
    }

    //privite methods

    function readyOnly(data) {
      if (typeof data == 'number') {
        return data;
      }
      return Object.assign({}, data);
    }
  };


  // ****************************************************************
  // ****************************************************************




  let rand = generateRandomPoster();

  store.posters.map(p => App.addPoster('#secondary-posters', p));
  App.render('#main-poster', store.mainPoster);
  App.render('#rand-poster', rand);

  let ps1 = generateRandomPoster({
    'w': 3,
    'h': 4
  });
  let ps2 = generateRandomPoster({
    'w': 5,
    'h': 5
  });
  let ps3 = generateRandomPoster({
    'w': 6,
    'h': 7
  });
  let ps4 = generateRandomPoster({
    'w': 8,
    'h': 3
  });
  let ps5 = generateRandomPoster({
    'w': 5,
    'h': 5
  });

  App.render('#last-posters', ps3);
  App.render('#last-posters', ps1);
  App.render('#last-posters', ps4);
  App.render('#last-posters', ps2);
  App.render('#last-posters', ps5);



}());