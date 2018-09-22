import React from 'react';
import SearchBar from './SearchBar';
import SearchResultsList from './SearchResultsList';
import DataCompiler from './data/DataCompiler';
import Fuse from 'fuse.js';

class SearchPortal extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            scriptureData: [],
            searchValue: '',
            searchResults: []
        };

        this.searchUpdateInterval = null;

        this.onSearchUpdate = this.onSearchUpdate.bind(this);
        this.goToClickedResult = this.goToClickedResult.bind(this);
    }

    componentDidMount()
    {
        const scriptureData = (new DataCompiler).data;

        this.setState({ scriptureData });

        const options = {
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                {
                    name: 'book',
                    weight: 0.3
                }, 
                {
                    name: 'chapter',
                    weight: 0.7
                },
            ]
        };


        this.fuse = new Fuse(scriptureData, options);
    }

    onSearchUpdate(searchValue)
    {
        this.setState({ searchValue });
        
        this.searchUpdateInterval = setTimeout(() => {

            const searchResults = this.getResults(searchValue);
            this.setState({ searchResults });

        }, 1000);
    }

    getResults(searchValue)
    {
        const results = this.fuse.search(searchValue);

        return results;
    }

    goToClickedResult(result)
    {
        const libraryLink = this.buildLibraryLink(result);

        window.open(libraryLink, '_blank');
    }

    buildLibraryLink(result)
    {
        const volumeAlias = result.volume || 'bofm';
        const bookAlias = result.book || '1-ne';
        const chapter = result.chapter || 1;
        const verse = result.verse || 1;

        return `gospellibrary://content/scriptures/${volumeAlias}/${bookAlias}/${chapter}.${verse}?lang=eng`;
    }

    render()
    {
        const { searchValue, searchResults } = this.state;

        return (
            <div>
                <SearchBar searchValue={searchValue} onSearchUpdate={this.onSearchUpdate} />
                <SearchResultsList results={searchResults} goToClickedResult={this.goToClickedResult} />
            </div>
        );
    }
}

export default SearchPortal;
