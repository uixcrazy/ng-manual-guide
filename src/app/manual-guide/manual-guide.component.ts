import { Component, OnInit } from '@angular/core';
import * as showdown from 'showdown';

@Component({
  selector: 'manual-guide',
  templateUrl: 'manual-guide.component.html',
  styleUrls: ['manual-guide.scss']
})
export class ManualGuideComponent implements OnInit {

  testttt: string;
  navigation = [
    {
      title: 'Introduction',
      value: 'introduction', // same with name file
    },
    {
      title: 'Getting started',
      value: 'getting-started',
    },
    {
      title: 'Fundamentals',
      value: 'fundamentals',
    },

  ];
  data = {};
  content: string;
  selected: any;
  converter: any;

  constructor() {
    this.converter = new showdown.Converter();
  }

  ngOnInit() {
    this.navigation.forEach(value => {
      this.data[value.value] = require(`raw-loader!./list-guide/${value.value}.md`)
    });
    this.onChangeContent();
  }

  onChangeContent(nav?) {
    this.selected = nav || this.navigation[0];
    const data = this.data && this.data[this.selected.value];
    this.content = this.converter.makeHtml(data);
  }
}
