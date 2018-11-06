// store

const store = {
  posters: {
    'brazil': {
      name: 'brazil',
      columns: 4,
      rows: 5,
      data: [{
          id: 0,
          format: 'circle',
          color: 'yellow'
        },
        {
          id: 1,
          format: 'circle',
          color: 'yellow'
        },
        {
          id: 2,
          format: 'circle',
          color: 'yellow'
        },
        {
          id: 3,
          format: 'circle',
          color: 'yellow'
        },
        {
          id: 4,
          format: 'circle',
          color: 'yellow'
        },
        {
          id: 5,
          format: 'circle',
          color: 'yellow'
        },
        {
          id: 6,
          format: 'circle',
          color: 'yellow'
        },
        {
          id: 7,
          format: 'circle',
          color: 'yellow'
        },
        {
          id: 8,
          format: 'circle',
          color: 'yellow'
        },
        {
          id: 9,
          format: 'circle',
          color: 'yellow'
        },
        {
          id: 10,
          format: 'circle',
          color: 'yellow'
        },
        {
          id: 11,
          format: 'circle',
          color: 'yellow'
        },
        {
          id: 12,
          format: 'circle',
          color: 'yellow'
        },
      ]
    },
  }
}

// view

class Ui {
  constructor() {
    document.querySelector('#div-secondary').appendChild(
      this.createFragment('<span>Dream on</span>')
    );

    console.log('ui created.')
  }

  elt(type, props, ...children) {
    let dom = document.createElement(type);
    if (props) Object.assign(dom, props);
    for (let child of children) {
      if (typeof child != "string") dom.appendChild(child);
      else dom.appendChild(document.createTextNode(child));
    }
    return dom;
  }

  createFragment(htmlStr) {

    if (!htmlStr) {
      console.error('bad vibes here');
      return;
    }

    var frag = document.createDocumentFragment(),
      temp = document.createElement('div');

    temp.innerHTML = htmlStr;

    while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
    }

    return frag;
  }

  render(struct) {
    console.log(struct)
  }


}

class Palette {
  constructor() {
    this.colors = [];

    console.log('pallete created.')
  }

  set(name, value) {
    this.colors[name] = value;
  }
}

class Poster {
  constructor(name, columns, rows, data) {
    this.name = name;

    this.columns = columns;
    this.rows = rows;
    this.data = data;
    // this.pallete = new Pallete();
  }

  describle() {
    return [
      this.name,
      this.rows,
      this.columns
    ]
  }

  generateHtml() {
    console.log('[poster] generating html')
    return '<span></span>'
  }
}

class PostersManager {

  constructor() {
    this.posters = {}

    console.log('[PostersManager] posters manager created.')
  }

  addPoster({
    name,
    columns,
    rows,
    data
  }) {
    this.posters[name] = new Poster(name, columns, rows, data)
    console.log(this.keys)
  }

  render() {
    let result = []
    let poster = ''

    console.log('[PostersManager] trying to render posters');

    for (poster in this.posters) {
      result.push(this.posters[poster].generateHtml())
    }

    return result;
  }
}



// control

class App {
  constructor() {
    this.ui = new Ui();
    this.posters = new PostersManager();
    this.posters.addPoster(Object.assign({}, store.posters.brazil));

    console.log(this.posters)

    this.ui.render(this.posters.render());
  }
}

new App();