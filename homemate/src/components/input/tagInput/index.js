import './tagInput.css';

function TagInput() {
    
    return (
        <>
            <label for="story">Tags:</label>
            <textarea id="story" name="story"
                rows="5" cols="40" placeholder="Exemplos de tags: <UFCG> <Campina Grande> <Água incluso> <IPTU não incluso>">
                    
            </textarea>
        </>
    );
}

export default TagInput;