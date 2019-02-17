export class AudioModule{
    public record: Blob;
    public title: string;
    constructor(record:Blob,title:string) {
        this.record = record;
        this.title = title;
    }
}