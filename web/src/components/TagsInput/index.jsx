import React from 'react';
import {SERVICES} from './services';
import './styles.css';
import { WithContext as ReactTags } from 'react-tag-input';

const suggestions = SERVICES.map((country) => {
  return {
    id: country,
    name: country
  }
})

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class TagsInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [{ id: 'Banho', name: 'Banho' }, { id: 'Tosa', name: 'Tosa' }],
      suggestions: suggestions,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
   this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }

  handleTagClick(index) {
    console.log('The tag at index ' + index + ' was clicked');
  }

  render() {
    const { tags, suggestions } = this.state;
    return (
      <div className="mt-20">
        <ReactTags
          tags={tags}
          name="services" 
          id="services"
          suggestions={suggestions}
          labelField={'name'}
          delimiters={delimiters}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          handleTagClick={this.handleTagClick}
          placeholder="Adicione aqui o serviço e pressione Enter para adicionar"
        />
      </div>
    );
  }
}

export default TagsInput