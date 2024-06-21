import React from 'react';
import { connect } from 'react-redux'
import { selectDirectorySections } from './directory.selector';
import { createStructuredSelector } from 'reselect';

import MenuItem from '../menu-item/menu-item.component';

import './directory.style.scss';

const Directory = ({ sections }) => (
        <div className='directory-menu'>
            {sections.map(({id, ...otherSectionsProps }) => (
              <MenuItem key={id} {...otherSectionsProps}/>
            ))}
        </div>
    );

const mapStateProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateProps)(Directory);