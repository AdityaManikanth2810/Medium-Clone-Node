import {getRepository} from "typeorm";
import {Article} from "../entities/Article";
import {User} from "../entities/User";
import {slugify} from "../utils/stringUtils";
import SanitizeUser from "../utils/security";

interface ArticleData {
    title: string;
    description: string;
    body: string;
    tagList: string[];
}

export async function createArticle(data: ArticleData, email: string) {
    if (!data.title) throw new Error('Title not present');
    if (!data.description) throw new Error('Description not present');
    if (!data.body) throw new Error('Body not present');

    const repo = getRepository(Article);
    const userRepo = getRepository(User);

    try {

        const user = await userRepo.findOne({email}) as User;

        if (!user) throw new Error('User does not exist')

        return await repo.save(new Article(
            slugify(data.title),
            data.title,
            data.description,
            data.body,
            SanitizeUser(user)
        ));
    } catch (e) {
        throw e;
    }
}

export async function updateArticle(slug: string, data: Partial<ArticleData>) {

}

export async function deleteArticle(slug: string) {

}

export async function getAllArticles() {

}

export async function getFeedArticles(email: string) {

}

export async function getArticleBySlug(slug: string) {

}