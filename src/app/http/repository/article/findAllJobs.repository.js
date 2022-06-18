import articleModel from '../../../model/article/article.model.js';


class findAllJobsRepository {
    constructor () {
        this.articleModel = articleModel;
    }

    async findAll () {
        return await this.articleModel.find({deleted_in: null}).select({created_by: 0, created_in: 0, last_updated: 0, deleted_in: 0, __v: 0});
    }

    async findOne (id) {
        try {
            const a = await this.articleModel.findById(id).select({created_by: 0, created_in: 0, last_updated: 0, deleted_in: 0, __v: 0});

            if (a === null && a === undefined)
            return false

            return true, a            
        } catch (e) {
            return false;
        }
    }
}

export default new findAllJobsRepository();