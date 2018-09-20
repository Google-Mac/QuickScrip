import React from 'react';
import SearchBar from './SearchBar';
import SearchResultsList from './SearchResultsList';
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

        this.onSearchUpdate = this.onSearchUpdate.bind(this);
        this.goToClickedResult = this.goToClickedResult.bind(this);
    }

    componentDidMount()
    {
        const scriptureData = [
            {
                chapter: 1,
                heading: "My first chapter heading",
                book: "John",
                volume: "New Testament"
            },
            {
                chapter: 2,
                heading: "My second chapter heading",
                book: "John",
                volume: "New Testament"
            },
            {
                chapter: 3,
                heading: "My third chapter heading",
                book: "John",
                volume: "New Testament"
            },
            {
                chapter: 4,
                heading: "My fourth chapter heading",
                book: "John",
                volume: "New Testament"
            },
            {
                chapter: 5,
                heading: "My fifth chapter heading",
                book: "John",
                volume: "New Testament"
            },
            {
                chapter: 1,
                heading: "My first chapter heading",
                book: "Genesis",
                volume: "Old Testament"
            },
            {
                chapter: 2,
                heading: "My second chapter heading",
                book: "Genesis",
                volume: "Old Testament"
            },
            {
                chapter: 3,
                heading: "My third chapter heading",
                book: "Genesis",
                volume: "Old Testament"
            },
            {
                chapter: 4,
                heading: "My fourth chapter heading",
                book: "Genesis",
                volume: "Old Testament"
            },
            {
                chapter: 10,
                heading: "My tenth chapter heading",
                book: "Nephi",
                volume: "Book of Mormon"
            }
        ];

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
        const results = this.getResults(searchValue);

        console.log(results);

        this.setState({ searchValue, searchResults: results });
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
        const volumeAlias = 'bofm';
        const bookAlias = '1-ne';
        const chapter = result.chapter || 1;

        return `gospellibrary://content/scriptures/${volumeAlias}/${bookAlias}/${chapter}.1?lang=eng`;
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
