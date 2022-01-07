import mongoose from 'mongoose';

interface RecordAttrs {
    key: string;
    value: string;
    createdAt: object;
    counts: number[];
}

interface RecordDoc extends mongoose.Document {
    key: string;
    value: string;
    createdAt: object;
    counts: number[];
}

interface RecordModel extends mongoose.Model<RecordDoc> {
    build(attrs: RecordAttrs): RecordDoc;
}

const recordSchema = new mongoose.Schema<RecordDoc, RecordModel>({
    key: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Object,
        required: false
    },
    counts: {
        type: Array,
        required: false
    }
});

recordSchema.statics.build = (attrs: RecordAttrs) => {
    return new Record(attrs);
}

const Record = mongoose.model<RecordDoc, RecordModel>('Record', recordSchema);

export { Record };
