const Blog = require('./blog.model');

class BlogRepository {
  async create(data) {
    return Blog.create(data);
  }

  async findAll({ skip, limit }) {
    return Blog.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
  }

  async count() {
    return Blog.countDocuments();
  }

  async findById(id) {
    return Blog.findById(id);
  }

  async update(id, data) {
    return Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return Blog.findByIdAndDelete(id);
  }
}

module.exports = BlogRepository;
