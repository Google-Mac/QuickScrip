import React from 'react';
import SearchPortal from './search/SearchPortal';

class App extends React.Component
{
    render()
    {
        return (
            <div>
                { /*<Navbar user={app.user}/>*/ }
                <SearchPortal />
            </div>
        );
    }
}

export default App;
