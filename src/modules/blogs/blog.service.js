const AppError = require('../../shared/utils/app-error');

class BlogService {
  constructor(repository) {
    this.repository = repository;
  }

  async createBlog(payload) {
    return this.repository.create(payload);
  }

  async listBlogs(pagination) {
    const [blogs, total] = await Promise.all([
      this.repository.findAll(pagination),
      this.repository.count()
    ]);

    return {
      blogs,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit
      }
    };
  }

  async getBlog(id) {
    const blog = await this.repository.findById(id);

    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    return blog;
  }

  async updateBlog(id, payload) {
    const blog = await this.repository.update(id, payload);

    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    return blog;
  }

  async deleteBlog(id) {
    const blog = await this.repository.delete(id);

    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    return blog;
  }
}

module.exports = BlogService;
