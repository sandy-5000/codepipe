import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    validate: {
      validator: (v) => {
        return /^[a-zA-Z0-9._-]+$/.test(v)
      },
    },
  },
  last_commit: {
    type: String,
    validate: {
      validator: (v) => {
        return /^[a-z0-9]{8}$/.test(v)
      },
    },
  },
  last_modified: {
    type: Date,
    default: Date.now(),
  },
  data: {
    type: String,
    default: '',
  },
})

fileSchema.index({ user_id: 1, name: 1 }, { unique: true })

export default mongoose.model('Files', fileSchema)
