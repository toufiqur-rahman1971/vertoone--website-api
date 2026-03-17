const AppError = require('../../shared/utils/app-error');

class JobService {
  constructor(repository) {
    this.repository = repository;
  }

  async createJob(payload) {
    return this.repository.create(payload);
  }

  async listJobs(pagination) {
    const [jobs, total] = await Promise.all([
      this.repository.findAll(pagination),
      this.repository.count()
    ]);

    return {
      jobs,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit
      }
    };
  }

  async getJob(id) {
    const job = await this.repository.findById(id);

    if (!job) {
      throw new AppError('Job not found', 404);
    }

    return job;
  }

  async updateJob(id, payload) {
    const job = await this.repository.update(id, payload);

    if (!job) {
      throw new AppError('Job not found', 404);
    }

    return job;
  }

  async deleteJob(id) {
    const job = await this.repository.delete(id);

    if (!job) {
      throw new AppError('Job not found', 404);
    }

    return job;
  }
}

module.exports = JobService;
