import React from 'react';
import SearchResult from './SearchResult';

class SearchResultsList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.resultClicked = this.resultClicked.bind(this);
    }

    resultClicked(result)
    {
        this.props.goToClickedResult(result);
    }

    render()
    {
        return (
            <div>
                {this.props.results.map(result => {
                    return <SearchResult 
                                result={result} 
                                key={`${result.book}-${result.chapter}-${result.verse}`} 
                                resultClicked={this.resultClicked} />;
                })}
            </div>
        );
    }
}

export default SearchResultsList;
