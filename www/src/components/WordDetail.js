import React from 'react';
import { Divider, Container, Segment } from 'semantic-ui-react';
import './WordDetail.css';

const WordDetail = ({ word }) => (
  <Container textAlign='justified'>
    {word.definitions.map((def, i) => (
      <div key={i}>
        <span className='word-type'>
          {`(${ def.type })`}
        </span>

        <span className='definition'>{def.definition}</span>

        <p className='translation'>{def.translation}</p>
        
        <Segment basic>
          {def.examples && def.examples.map((example, i) => 
            <q key={i}>{example}</q>
          )}
        </Segment>

        {i !== (word.definitions.length - 1) ? <Divider /> : null}
      </div>
    ))}
  </Container>
);

export default WordDetail;