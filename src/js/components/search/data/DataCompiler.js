
import { old_testament } from './all_volumes.js';

class DataCompiler
{
    constructor()
    {
        this.data = [];

        this.compile();
    }

    compile()
    {
        console.log(old_testament);

        this.extractVersesFrom(old_testament);
    }

    extractVersesFrom(volumeData)
    {
        const volume = volumeData.name;

        for (const bookData of volumeData.books) {

            const book = bookData.name;

            for (const chapterData of bookData.chapters) {

                const chapter = chapterData.number;

                for (let verse = 1; verse <= chapterData.verses; verse++) {

                    this.data.push({ volume, book, chapter, verse });
                    
                } // end verses
            } // end chapters
        } // end books
    }
}

export default DataCompiler;
