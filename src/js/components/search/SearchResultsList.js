import React from 'react';
import SearchResult from './SearchResult';

class SearchResultsList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.goToClickedResult = this.goToClickedResult.bind(this);
    }

    goToClickedResult(result)
    {
        this.props.goToClickedResult(result);
    }

    render()
    {
        const results = this.props.results.map(result => {
            return <SearchResult result={result} key={`${result.book}-${result.chapter}`} goToClickedResult={this.goToClickedResult} />;
        });

        return (
            <div>
                {results}
            </div>
        );
    }
}

export default SearchResultsList;
