const Job = require('./job.model');

class JobRepository {
  async create(data) {
    return Job.create(data);
  }

  async findAll({ skip, limit }) {
    return Job.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
  }

  async count() {
    return Job.countDocuments();
  }

  async findById(id) {
    return Job.findById(id);
  }

  async update(id, data) {
    return Job.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return Job.findByIdAndDelete(id);
  }
}

module.exports = JobRepository;
