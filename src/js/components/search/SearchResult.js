import React from 'react';

class SearchResult extends React.Component
{
    constructor(props)
    {
        super(props);

        this.onResultClicked = this.onResultClicked.bind(this);
    }

    onResultClicked()
    {
        this.props.goToClickedResult(this.props.result);
    }

    render()
    {
        const { result } = this.props;

        return (
            <div>
                {result.book} - {result.chapter} ({result.volume})
                <button onClick={this.onResultClicked}>Open It!</button>
            </div>
        );
    }
}

export default SearchResult;
