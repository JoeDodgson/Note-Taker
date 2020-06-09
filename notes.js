class Note {
    constructor (id, title, text) {
        this.id = id;
        this.title = title;
        this.text = text;
    }

    returnString() {
        return JSON.parse(`{"id" : "${this.id}",
        "title" : "${this.title}",
        "text" : "${this.text}"}`);
    }
}

module.exports = {
    Note : Note
};