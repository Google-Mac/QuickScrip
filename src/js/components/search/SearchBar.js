import React from 'react';

class SearchBar extends React.Component
{
    constructor(props)
    {
        super(props);

        this.update = this.update.bind(this);
    }

    update(e)
    {
        const searchValue = e.target.value;

        this.props.onSearchUpdate(searchValue);
    }

    render()
    {
        const { searchValue } = this.props;

        return (
            <div>
                <input value={searchValue} onChange={this.update} type="text" />
            </div>
        );
    }
}

export default SearchBar;
