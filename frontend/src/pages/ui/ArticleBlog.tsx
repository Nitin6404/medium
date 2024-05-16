import img from '../../assets/women.jpg';

interface ArticleBlogProps {
    title: string;
    content: string;
    author: string;
}

const ArticleBlog = ({title, content, author}: ArticleBlogProps) => {
    return (
        <div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8 py-12 px-6 md:px-8 lg:px-10 text-white">
                <main>
                    <article className="space-y-4">
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <div className="flex items-center gap-4 text-gray-500">
                            <div>
                                <img
                                    alt="Author Avatar"
                                    className="rounded-full"
                                    height={40}
                                    src={img}
                                    style={{
                                        aspectRatio: "40/40",
                                        objectFit: "cover",
                                    }}
                                    width={40}
                                />
                            </div>
                            <div>
                                <span>{author}</span>
                                <span className="mx-2">•</span>
                                <span>May 15, 2024</span>
                            </div>
                        </div>
                        <div className="prose prose-gray dark:prose-invert">
                            <p>
                                {content}
                            </p>
                        </div>
                    </article>
                </main>
                <aside>
                    <div className="sticky top-12">
                        <div className="border-white border p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
                            <ul className="space-y-4">
                                <li>
                                    <a className="block hover:underline" href="/blog/1">
                                        The Benefits of Regular Exercise
                                    </a>
                                </li>
                                <li>
                                    <a className="block hover:underline" href="/blog/2">
                                        How to Improve Your Sleep Quality
                                    </a>
                                </li>
                                <li>
                                    <a className="block hover:underline" href="/blog/3">
                                        Tips for Reducing Stress and Anxiety
                                    </a>
                                </li>
                                <li>
                                    <a className="block hover:underline" href="/blog/4">
                                        The Importance of Mindfulness in Daily Life
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>
            </div >
        </div>
    )
}


export default ArticleBlog;