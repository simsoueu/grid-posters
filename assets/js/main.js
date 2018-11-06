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

  // let someone = {
  //   name: 'raul',
  //   classes: ['a', 'b']
  // }

  // const dude = PPoster(someone);


  // console.log(PPoster().toObject())
  // console.log(dude.toObject());

  // console.log(dude.age());
  // console.log(dude.doubleAge());
  // console.log(dude.age());


  // console.log(dude.age());
  // console.log(dude.timesUp());

  // console.log(dude.toObject().classes);

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

    //delcaration of public methods and attributes
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









  const store = {
    mainPoster: {
      name: 'japan',
      description: 'I know am not the only one',
      columns: 12,
      rows: 7,
      classList: ['poster-round'],
      data: [

        {
          format: 'round-top-left',
          color: 'turquoise'
        }, {
          format: 'round-top-right',
          color: 'teal'
        }, {
          format: 'round-bottom-left',
          color: 'pink'
        }, {
          format: 'round-top-right',
          color: 'teal'
        }, {
          format: 'round-top-left',
          color: 'purple-light'
        }, {
          format: 'round-top-right',
          color: 'purple-light'
        }, {
          format: 'round-top-right',
          color: 'purple'
        }, {
          format: 'round-top-left',
          color: 'teal'
        }, {
          format: 'round-top-right',
          color: 'pink'
        }, {
          format: 'round-bottom-right',
          color: 'turquoise'
        }, {
          format: 'round-top-left',
          color: 'purple-light'
        }, {
          format: 'round-top-right',
          color: 'purple'
        }, {
          format: 'round-bottom-left',
          color: 'turquoise'
        }, {
          format: 'round-bottom-left',
          color: 'purple'
        }, {
          format: 'round-top-right',
          color: 'orange'
        }, {
          format: 'round-top-left',
          color: 'purple'
        }, {
          format: 'round-top-right',
          color: 'pink'
        }, {
          format: 'round-top-right',
          color: 'turquoise'
        }, {
          format: 'round-top-left',
          color: 'teal'
        }, {
          format: 'round-top-right',
          color: 'pink'
        }, {
          format: 'round-bottom-right',
          color: 'turquoise'
        }, {
          format: 'round-top-left',
          color: 'purple-light'
        }, {
          format: 'round-top-right',
          color: 'orange'
        }, {
          format: 'round-bottom-right',
          color: 'teal'
        }, {
          format: 'round-bottom-left',
          color: 'pink'
        }, {
          format: 'round-top-right',
          color: 'teal'
        }, {
          format: 'round-bottom-left',
          color: 'orange'
        }, {
          format: 'round-top-right',
          color: 'purple-light'
        }, {
          format: 'round-top-right',
          color: 'pink'
        }, {
          format: 'round-top-right',
          color: 'purple'
        }, {
          format: 'round-top-left',
          color: 'teal'
        }, {
          format: 'round-bottom-left',
          color: 'pink'
        }, {
          format: 'round-bottom-right',
          color: 'turquoise'
        }, {
          format: 'round-top-right',
          color: 'purple'
        }, {
          format: 'round-bottom-right',
          color: 'pink'
        }, {
          format: 'round-top-right',
          color: 'teal'
        }, {
          format: 'round-bottom-left',
          color: 'pink'
        }, {
          format: 'round-top-right',
          color: 'teal'
        }, {
          format: 'round-top-left',
          color: 'purple-light'
        }, {
          format: 'round-top-right',
          color: 'purple-light'
        }, {
          format: 'round-top-right',
          color: 'purple'
        }, {
          format: 'round-top-left',
          color: 'teal'
        }, {
          format: 'round-top-right',
          color: 'pink'
        }, {
          format: 'round-bottom-right',
          color: 'turquoise'
        }, {
          format: 'round-top-left',
          color: 'purple-light'
        }, {
          format: 'round-top-right',
          color: 'purple'
        }, {
          format: 'round-bottom-right',
          color: 'teal'
        }, {
          format: 'round-top-right',
          color: 'pink'
        }, {
          format: 'round-top-right',
          color: 'teal'
        }, {
          format: 'round-top-left',
          color: 'orange'
        }, {
          format: 'round-bottom-left',
          color: 'purple'
        }, {
          format: 'round-top-left',
          color: 'pink'
        }, {
          format: 'round-top-left',
          color: 'turquoise'
        }, {
          format: 'round-top-right',
          color: 'teal'
        }, {
          format: 'round-bottom-left',
          color: 'pink'
        }, {
          format: 'round-top-right',
          color: 'teal'
        }, {
          format: 'round-bottom-left',
          color: 'purple-light'
        }, {
          format: 'round-top-right',
          color: 'orange'
        }, {
          format: 'round-bottom-left',
          color: 'pink'
        }, {
          format: 'round-bottom-right',
          color: 'pink'
        }, {
          format: 'round-bottom-right',
          color: 'teal'
        }, {
          format: 'round-bottom-left',
          color: 'orange'
        }, {
          format: 'round-top-right',
          color: 'orange'
        }, {
          format: 'round-bottom-right',
          color: 'teal'
        }, {
          format: 'round-bottom-left',
          color: 'pink'
        }, {
          format: 'round-top-right',
          color: 'turquoise'
        }, {
          format: 'round-top-right',
          color: 'orange'
        }, {
          format: 'round-bottom-left',
          color: 'pink'
        }, {
          format: 'round-top-right',
          color: 'teal'
        }, {
          format: 'round-bottom-left',
          color: 'orange'
        }, {
          format: 'round-top-right',
          color: 'teal'
        }, {
          format: 'round-bottom-left',
          color: 'orange'
        }, {
          format: 'round-top-left',
          color: 'turquoise'
        }, {
          format: 'round-top-right',
          color: 'teal'
        }, {
          format: 'round-bottom-left',
          color: 'pink'
        }, {
          format: 'round-top-right',
          color: 'teal'
        }, {
          format: 'round-top-left',
          color: 'purple-light'
        }, {
          format: 'round-bottom-left',
          color: 'purple-light'
        }, {
          format: 'round-bottom-right',
          color: 'purple'
        }, {
          format: 'round-top-left',
          color: 'teal'
        }, {
          format: 'round-top-right',
          color: 'pink'
        }, {
          format: 'round-bottom-right',
          color: 'turquoise'
        }, {
          format: 'round-top-left',
          color: 'purple-light'
        }, {
          format: 'round-top-right',
          color: 'purple'
        },
      ]
    },

    posters: [{
      name: 'brazil',
      description: 'I know am not the only one',
      columns: 13,
      rows: 5,
      parentClassList: ['primary', 'white-frame'],
      className: 'poster-brazil',
      data: [{
        format: 'maple1',
        color: 'yellow'
      }, {
        format: 'triangle',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'maple1',
        color: 'yellow'
      }, {
        format: 'triangle',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'triangle',
        color: 'yellow'
      }, {
        format: 'maple1',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'maple1',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'maple1',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'maple1',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'maple1',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'maple1',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'maple1',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'maple1',
        color: 'yellow'
      }, {
        format: 'maple2',
        color: 'yellow'
      }, {
        format: 'maple1',
        color: 'yellow'
      }, {
        format: 'maple1',
        color: 'yellow'
      }, ]
    }, {
      name: 'uruguay',
      description: 'I know am not the only one',
      columns: 7,
      rows: 5,
      parentClassList: ['primary', 'white-frame'],
      className: 'poster-uruguay',
      data: [{
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'yellow'
      }, {
        format: 'diamond',
        color: 'yellow'
      }, {
        format: 'diamond',
        color: 'yellow'
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: 'yellow'
      }, {
        format: 'diamond',
        color: 'yellow'
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'white'
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'yellow'
      }, {
        format: 'diamond',
        color: ''
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: ''
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: ''
      }, {
        format: 'diamond',
        color: ''
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'turquoise'
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'turquoise'
      }]
    }, {
      name: 'france',
      description: 'I know am not the only one',
      columns: 7,
      rows: 5,
      parentClassList: ['primary', 'white-frame'],
      className: 'poster-france',
      data: [{
        format: 'diamond',
        color: 'white'
      }, {
        format: 'diamond',
        color: 'blue'
      }, {
        format: 'diamond',
        color: 'blue'
      }, {
        format: 'diamond',
        color: 'white'
      }, {
        format: 'diamond',
        color: 'red'
      }, {
        format: 'diamond',
        color: 'red'
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'red'
      }, {
        format: 'diamond',
        color: 'red'
      }, {
        format: 'diamond',
        color: 'blue'
      }, {
        format: 'diamond',
        color: 'blue'
      }, {
        format: 'diamond',
        color: 'red'
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'blue'
      }, {
        format: 'diamond',
        color: 'orange'
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'blue'
      }, {
        format: 'diamond',
        color: ''
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'orange'
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'red'
      }, {
        format: 'diamond',
        color: 'blue'
      }, {
        format: 'diamond',
        color: 'teal'
      }, {
        format: 'diamond',
        color: 'orange'
      }, {
        format: 'diamond',
        color: 'red'
      }, {
        format: 'diamond',
        color: 'red'
      }, {
        format: 'diamond',
        color: 'blue'
      }, {
        format: 'diamond',
        color: 'whie'
      }, {
        format: 'diamond',
        color: 'red'
      }, {
        format: 'diamond',
        color: 'red'
      }, {
        format: 'diamond',
        color: 'red'
      }, {
        format: 'diamond',
        color: 'red'
      }, {
        format: 'diamond',
        color: 'white'
      }, {
        format: 'diamond',
        color: 'white'
      }, {
        format: 'diamond',
        color: 'orange'
      }, {
        format: 'diamond',
        color: 'blue'
      }, {
        format: 'diamond',
        color: 'red'
      }, {
        format: 'diamond',
        color: 'blue'
      }, {
        format: 'diamond',
        color: 'orange'
      }]
    }]
  };

  // ****************************************************************
  // ****************************************************************



  function generateRandomPoster(w, h) {

    if (!w) w = 4;
    if (!h) h = 6;

    let i;
    let j;
    let choice;


    const patterns = {
      'simple': {
        format: ['circle', 'square', ],
        colors: ['blue', 'teal', 'turquoise', 'white']
      },
      'squares': {
        format: ['square', ],
        colors: ['green', 'teal', 'turquoise', 'white']
      },
      'round': {
        format: ['round-top-right', 'round-top-left', 'round-bottom-right', 'round-bottom-left'],
        colors: ['pink', 'orange', 'red', 'yellow', 'white']
      },
      'mixed': {
        format: ['diamond', 'round-top-right', 'round-top-left'],
        colors: ['black', 'white']

      }
    };
    let rand = Math.random();

    choice = rand > 0.85 ? 'simple' : (
      Math.random() > 0.5 ? 'squares' : (
        Math.random() > 0.25 ? 'round' : 'mixed'
      )
    );


    let data = [];

    for (i = 0; i < w; i++) {
      for (j = 0; j < h; j++) {
        let rand1 = Math.floor(Math.random() * patterns[choice].format.length);
        let rand2 = Math.floor(Math.random() * patterns[choice].colors.length);
        let obj = {};
        obj['format'] = patterns[choice].format[rand1];
        obj['color'] = patterns[choice].colors[rand2];
        data.push(obj);
      }
    }

    let parentList = choice == 'mixed' ? ['secondary'] : ['primary'];
    return {
      name: 'randomq',
      parentClassList: parentList,
      classList: ['poster-round'],
      description: 'I know am not the only one',
      columns: w,
      rows: h,
      data
    }
  }

  let rand = generateRandomPoster();

  store.posters.map(p => App.addPoster('#secondary-posters', p));
  App.render('#main-poster', store.mainPoster);
  App.render('#rand-poster', rand);

  let ps1 = generateRandomPoster(3, 4);
  let ps2 = generateRandomPoster(5, 5);
  let ps3 = generateRandomPoster(6, 7);
  let ps4 = generateRandomPoster(8, 3);
  let ps5 = generateRandomPoster(5, 5);

  App.render('#last-posters', ps1);
  App.render('#last-posters', ps2);
  App.render('#last-posters', ps3);
  App.render('#last-posters', ps4);
  App.render('#last-posters', ps5);



}());