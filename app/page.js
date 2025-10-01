    'use client';

    import { useState, useEffect } from 'react';
    import { marked } from 'marked';

    // --- SVG Icon Components ---
    const SearchIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );

    // --- Header Component ---
    const Header = ({ onNavigate, onSearch, searchQuery, onCategoryNav, isAdmin, onLogout }) => {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [isScrolled, setIsScrolled] = useState(false);

        useEffect(() => {
            const handleScroll = () => {
                setIsScrolled(window.scrollY > 10);
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        const handleNavClick = (page) => {
            onNavigate(page);
            setIsMenuOpen(false);
        };
        
        const handleCategoryClick = (category) => {
            onCategoryNav(category);
            setIsMenuOpen(false);
        };

        return (
            <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-sm' : 'bg-white shadow-sm'}`}>
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button onClick={() => handleNavClick('home')} className="text-2xl font-bold text-gray-900 transition-transform duration-200 hover:scale-105">Udaxgui.com</button>
                        
                        <nav className="hidden md:flex items-center space-x-8">
                            <button onClick={() => handleNavClick('home')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Нүүр</button>
                            <button onClick={() => handleNavClick('blog')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Нийтлэл</button>
                            <button onClick={() => handleCategoryClick('Сайн мэдээ')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Сайн мэдээ</button>
                            {isAdmin && (
                                <>
                                    <button onClick={() => handleNavClick('manage-posts')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Нийтлэл засах</button>
                                    <button onClick={() => handleNavClick('add-post')} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition-colors">Нийтлэл нэмэх</button>
                                    <button onClick={onLogout} className="text-red-500 hover:text-red-700 font-medium transition-colors">Гарах</button>
                                </>
                            )}
                        </nav>

                        <div className="flex items-center">
                            <div className="relative hidden md:block">
                                <input 
                                    type="text" 
                                    placeholder="Хайх..." 
                                    value={searchQuery}
                                    onChange={(e) => onSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="absolute top-0 left-0 inline-flex items-center justify-center h-full w-10 text-gray-400">
                                    <SearchIcon />
                                </div>
                            </div>
                            <div className="md:hidden ml-4">
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {isMenuOpen && (
                        <div className="md:hidden pt-4">
                            <div className="relative mb-4">
                               <input 
                                    type="text" 
                                    placeholder="Хайх..." 
                                    value={searchQuery}
                                    onChange={(e) => onSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="absolute top-0 left-0 inline-flex items-center justify-center h-full w-10 text-gray-400">
                                    <SearchIcon />
                                </div>
                            </div>
                            <button onClick={() => handleNavClick('home')} className="block w-full text-left py-2 px-4 text-sm text-gray-600 hover:bg-gray-100 rounded">Нүүр</button>
                            <button onClick={() => handleNavClick('blog')} className="block w-full text-left py-2 px-4 text-sm text-gray-600 hover:bg-gray-100 rounded">Нийтлэл</button>
                            <button onClick={() => handleCategoryClick('Сайн мэдээ')} className="block w-full text-left py-2 px-4 text-sm text-gray-600 hover:bg-gray-100 rounded">Сайн мэдээ</button>
                             {isAdmin && (
                                <>
                                    <button onClick={() => handleNavClick('manage-posts')} className="block w-full text-left py-2 px-4 text-sm text-gray-600 hover:bg-gray-100 rounded">Нийтлэл засах</button>
                                    <button onClick={() => handleNavClick('add-post')} className="block w-full text-left mt-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">Нийтлэл нэмэх</button>
                                    <button onClick={onLogout} className="block w-full text-left py-2 px-4 text-sm text-red-500 hover:bg-gray-100 rounded">Гарах</button>
                                </>
                             )}
                        </div>
                    )}
                </div>
            </header>
        );
    };

    // --- Featured Post Component ---
    const FeaturedPost = ({ post, onPostSelect }) => {
        if (!post) {
            return (
                <section className="mb-16">
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-700">Онцлох нийтлэл сонгогдоогүй байна</h2>
                        <p className="text-gray-500 mt-2">Админ хэсгээс нийтлэлээ сонгоно уу.</p>
                    </div>
                </section>
            );
        }

        const categoryStyles = getCategoryStyles(post.category);

        return (
            <section className="mb-16">
                <button onClick={() => onPostSelect(post)} className="w-full text-left">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4 items-center transition-transform duration-300 hover:shadow-2xl">
                        <div className="relative h-64 lg:h-full">
                            <img className="w-full h-full object-cover" src={post.imageUrl} alt={post.title} />
                        </div>
                        <div className="p-8 lg:p-12">
                            <span className={`text-sm font-semibold ${categoryStyles.color} ${categoryStyles.bgColor} py-1 px-3 rounded-full`}>Онцлох нийтлэл</span>
                            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                {post.title}
                            </h1>
                            <p className="mt-4 text-gray-600">
                                {post.excerpt}
                            </p>
                            <div className="mt-6">
                                <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString('mn-MN')}</p>
                            </div>
                        </div>
                    </div>
                </button>
            </section>
        );
    };


    // --- Blog Card Component ---
    const BlogCard = ({ post, onPostSelect }) => {
        const categoryStyles = getCategoryStyles(post.category);
        const truncatedExcerpt = post.excerpt.split(' ').slice(0, 20).join(' ') + (post.excerpt.split(' ').length > 20 ? '...' : '');

        return (
            <button onClick={() => onPostSelect(post)} className="text-left w-full">
                <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl h-full">
                    <img className="w-full h-48 object-cover" src={post.imageUrl} alt="Нийтлэлийн зураг" />
                    <div className="p-6">
                        <span className={`text-xs font-semibold ${categoryStyles.color} ${categoryStyles.bgColor} py-1 px-3 rounded-full`}>{categoryStyles.name}</span>
                        <h3 className="mt-3 text-xl font-bold text-gray-900">
                            {post.title}
                        </h3>
                        <p className="mt-2 text-gray-600 text-sm">
                            {truncatedExcerpt}
                        </p>
                        <div className="mt-4">
                            <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString('mn-MN')}</p>
                        </div>
                    </div>
                </article>
            </button>
        );
    };


    // --- Footer Component ---
    const Footer = ({ onNavigate, onCategoryNav }) => {
        return (
            <footer className="bg-gray-900 text-white">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold">Udaxgui.com</h3>
                            <p className="mt-4 text-gray-400 text-sm">
                                Итгэл, найдвар, хайрын тухай мэдлэг түгээх блог.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-md font-semibold tracking-wider uppercase">Холбоосууд</h4>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li><button onClick={() => onNavigate('blog')} className="text-gray-400 hover:text-white transition-colors">Нийтлэл</button></li>
                                <li><button onClick={() => onCategoryNav('Сайн мэдээ')} className="text-gray-400 hover:text-white transition-colors">Сайн мэдээ</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
                        <button onClick={() => onNavigate('admin')} className="text-sm text-gray-400 cursor-pointer">&copy; 2025 Udaxgui.com. Бүх эрх хуулиар хамгаалагдсан.</button>
                    </div>
                </div>
            </footer>
        );
    };

    const mongolianCategories = {
        advent: { name: "Advent", color: "text-red-600", bgColor: "bg-red-100" },
        resurrection: { name: "Үхэл ба амилал", color: "text-purple-600", bgColor: "bg-purple-100" },
        gospel: { name: "Сайн мэдээ", color: "text-green-600", bgColor: "bg-green-100" },
        parables: { name: "Сургаалт зүйрлэлүүд", color: "text-yellow-600", bgColor: "bg-yellow-100" },
        eternalWord: { name: "Мөнх үгийн ойлголт", color: "text-blue-600", bgColor: "bg-blue-100" },
        hell: { name: "Тамын тухай", color: "text-orange-600", bgColor: "bg-orange-100" },
    };

    const WORKER_URL = "https://udaxgui-worker.monharvest.workers.dev";
    const ADMIN_SECRET_KEY = "YOUR_SECRET_PASSWORD";

    // --- Page Components ---

    const HomePage = ({ onPostSelect, posts }) => {
        const [homeCategory, setHomeCategory] = useState('all');
        const categories = ['all', ...Object.values(mongolianCategories).map(c => c.name)];
        const filteredPosts = posts.filter(post => homeCategory === 'all' ? true : post.category === homeCategory).slice(0, 6);
        
        const featuredPost = posts.find(p => p.isFeatured === 1);

        return (
            <main className="container mx-auto px-6 py-12">
                <FeaturedPost post={featuredPost} onPostSelect={onPostSelect} />
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Нийтлэлүүд</h2>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {categories.map(category => (
                            <button key={category} onClick={() => setHomeCategory(category)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${homeCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                               {category === 'all' ? 'Бүгд' : category}
                            </button>
                        ))}
                    </div>
                    {filteredPosts.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filteredPosts.map((post) => (<BlogCard key={post.id} post={post} onPostSelect={onPostSelect} />))}
                        </div>
                    ) : (<p>Нийтлэл олдсонгүй...</p>)}
                </section>
            </main>
        );
    };

    const BlogPage = ({ onPostSelect, posts, selectedCategory, onCategorySelect, showFilters }) => {
        const categories = ['all', ...Object.values(mongolianCategories).map(c => c.name)];
        return (
         <main className="container mx-auto px-6 py-12">
            <section>
                <h1 className="text-4xl font-bold text-gray-900 mb-8">{selectedCategory === 'all' ? 'Бүх нийтлэлүүд' : selectedCategory}</h1>
                
                {showFilters && (
                     <div className="flex flex-wrap gap-2 mb-8">
                        {categories.map(category => (
                            <button 
                                key={category} 
                                onClick={() => onCategorySelect(category)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                                    selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                               {category === 'all' ? 'Бүгд' : category}
                            </button>
                        ))}
                    </div>
                )}

                {posts.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (<BlogCard key={post.id} post={post} onPostSelect={onPostSelect} />))}
                    </div>
                ) : (<p>Энэ ангилалд нийтлэл олдсонгүй.</p>)}
            </section>
        </main>
        );
    };

    const PostDetailPage = ({ post, onBack }) => {
        const [htmlContent, setHtmlContent] = useState('');

        useEffect(() => {
            const parseMarkdown = async () => {
                if (post && post.content) {
                    const parsedHtml = await marked.parse(post.content);
                    setHtmlContent(parsedHtml);
                } else if (post && post.excerpt) {
                    setHtmlContent(`<p>${post.excerpt}</p>`);
                }
            };
            parseMarkdown();
        }, [post]);

        return (
            <main className="container mx-auto px-6 py-12">
                <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900 font-semibold mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                    Нийтлэл рүү буцах
                </button>
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-6xl mx-auto">
                    <span className={`text-sm font-semibold ${getCategoryStyles(post.category).color} ${getCategoryStyles(post.category).bgColor} py-1 px-3 rounded-full`}>{post.category}</span>
                    <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{post.title}</h1>
                    <div className="mt-6"><p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString('mn-MN')}</p></div>
                    <img className="w-full h-auto object-cover rounded-lg mt-8" src={post.imageUrl} alt="Нийтлэлийн зураг" />
                    
                    <article 
                        className="prose lg:prose-xl mt-8 max-w-none text-gray-700 space-y-4"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>
            </main>
        );
    };

    const AdminLoginPage = ({ onLogin }) => {
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const handleSubmit = (e) => {
            e.preventDefault();
            if (password === ADMIN_SECRET_KEY) {
                onLogin();
            } else {
                setError('Нууц үг буруу байна.');
            }
        };
        return (
            <main className="container mx-auto px-6 py-12 flex justify-center items-center" style={{minHeight: '60vh'}}>
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 w-full max-w-md">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Админ нэвтрэх</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Нууц үг</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700">Нэвтрэх</button>
                    </form>
                </div>
            </main>
        );
    };

    const PostForm = ({ initialPost, onSubmit, isSubmitting, buttonText }) => {
        const [title, setTitle] = useState(initialPost?.title || '');
        const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
        const [imageUrl, setImageUrl] = useState(initialPost?.imageUrl || '');
        const [category, setCategory] = useState(initialPost?.category || Object.values(mongolianCategories)[0].name);
        const [content, setContent] = useState(initialPost?.content || '');
        const [metaDescription, setMetaDescription] = useState(initialPost?.metaDescription || '');
        const [imageFile, setImageFile] = useState(null);
        const [isUploading, setIsUploading] = useState(false);
        const [imagePreview, setImagePreview] = useState(initialPost?.imageUrl || null);

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
            }
        };
        
        const uploadFile = async (file) => {
            const formData = new FormData();
            formData.append('image', file);
            try {
                const response = await fetch(`${WORKER_URL}/api/images/upload`, {
                    method: 'POST',
                    headers: { 'x-admin-secret': ADMIN_SECRET_KEY },
                    body: formData,
                });
                const data = await response.json();
                if (data.success) {
                    return data.url;
                } else {
                    throw new Error(data.error);
                }
            } catch (error) {
                throw error;
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setIsUploading(true);
            let finalImageUrl = imageUrl;

            try {
                if (imageFile) {
                    finalImageUrl = await uploadFile(imageFile);
                }
            } catch (error) {
                alert(`Файл хуулахад алдаа гарлаа: ${error.message}`);
                setIsUploading(false);
                return;
            }
            
            setIsUploading(false);
            if (!finalImageUrl) {
                alert('Зураг сонгоно уу.');
                return;
            }

            onSubmit({ ...initialPost, title, excerpt, imageUrl: finalImageUrl, category, content, metaDescription });
        };

        return (
            <form onSubmit={handleSubmit}>
                <div className="mb-4"><label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Гарчиг</label><input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required /></div>
                <div className="mb-4"><label htmlFor="excerpt" className="block text-gray-700 font-semibold mb-2">Товч агуулга (20 үг)</label><textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows="3" className="w-full px-4 py-2 border rounded-lg" required></textarea></div>
                <div className="mb-4"><label htmlFor="metaDescription" className="block text-gray-700 font-semibold mb-2">SEO Meta Description</label><textarea id="metaDescription" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows="3" className="w-full px-4 py-2 border rounded-lg" required></textarea></div>
                <div className="mb-4"><label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Бүрэн агуулга (Markdown дэмжинэ)</label><textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows="10" className="w-full px-4 py-2 border rounded-lg" required></textarea></div>
                <div className="mb-4"><label className="block text-gray-700 font-semibold mb-2">Нийтлэлийн зураг</label><input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>{imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg max-h-40" />}</div>
                <div className="mb-6"><label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Ангилал</label><select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border rounded-lg bg-white">{Object.values(mongolianCategories).map((cat) => (<option key={cat.name} value={cat.name}>{cat.name}</option>))}</select></div>
                <button type="submit" disabled={isUploading || isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">{isUploading ? 'Файл хуулж байна...' : isSubmitting ? 'Хадгалж байна...' : buttonText}</button>
            </form>
        );
    };

    const AddPostPage = ({ onAddPost }) => {
        const [isSubmitting, setIsSubmitting] = useState(false);
        const handleAdd = async (newPost) => {
            setIsSubmitting(true);
            await onAddPost(newPost);
            setIsSubmitting(false);
        };
        return (
            <main className="container mx-auto px-6 py-12"><div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-2xl mx-auto"><h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Шинэ нийтлэл нэмэх</h1><PostForm onSubmit={handleAdd} isSubmitting={isSubmitting} buttonText="Нийтлэл нэмэх" /></div></main>
        );
    };

    const EditPostPage = ({ postToEdit, onUpdatePost }) => {
        const [isSubmitting, setIsSubmitting] = useState(false);
        const handleUpdate = async (updatedPost) => {
            setIsSubmitting(true);
            await onUpdatePost(updatedPost);
            setIsSubmitting(false);
        };
        return (
            <main className="container mx-auto px-6 py-12"><div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-2xl mx-auto"><h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Нийтлэл засах</h1><PostForm initialPost={postToEdit} onSubmit={handleUpdate} isSubmitting={isSubmitting} buttonText="Шинэчлэх" /></div></main>
        );
    };

    const ManagePostsPage = ({ posts, onEdit, onDelete, onFeature }) => {
        const [deletingId, setDeletingId] = useState(null);

        const handleDeleteClick = (postId) => {
            if (deletingId === postId) {
                onDelete(postId);
                setDeletingId(null);
            } else {
                setDeletingId(postId);
            }
        };
        
        return (
            <main className="container mx-auto px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Нийтлэл удирдах</h1>
                    <ul className="space-y-4">
                        {posts.map(post => (
                            <li key={post.id} className="flex justify-between items-center p-4 border rounded-lg">
                                <div>
                                    <span className="font-semibold">{post.title}</span>
                                    {post.isFeatured === 1 && <span className="ml-2 text-xs font-bold text-white bg-green-500 py-1 px-2 rounded-full">Онцлох</span>}
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => onFeature(post.id)} className="text-green-600 hover:text-green-800 font-semibold disabled:text-gray-400 disabled:cursor-not-allowed" disabled={post.isFeatured === 1}>Онцлох</button>
                                    <button onClick={() => onEdit(post)} className="text-blue-600 hover:text-blue-800 font-semibold">Засах</button>
                                    <button onClick={() => handleDeleteClick(post.id)} className={`font-semibold ${deletingId === post.id ? 'text-red-700' : 'text-red-500'}`}>
                                        {deletingId === post.id ? 'Баталгаажуулах уу?' : 'Устгах'}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        );
    };

    // Helper function to get category styles
    const getCategoryStyles = (categoryName) => {
        const categoryKey = Object.keys(mongolianCategories).find(key => mongolianCategories[key].name === categoryName);
        return mongolianCategories[categoryKey] || { name: categoryName, color: "text-gray-600", bgColor: "bg-gray-100" };
    };

    // --- Main App Component ---
    export default function App() {
        const [activePage, setActivePage] = useState('home');
        const [selectedPost, setSelectedPost] = useState(null);
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedCategory, setSelectedCategory] = useState('all');
        const [posts, setPosts] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [isAdmin, setIsAdmin] = useState(false);
        const [postToEdit, setPostToEdit] = useState(null);
        const [showBlogFilters, setShowBlogFilters] = useState(true);

        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${WORKER_URL}/api/posts`);
                const data = await response.json();
                if (data.success) setPosts(data.posts);
            } catch (error) { console.error("Failed to fetch posts:", error); } 
            finally { setIsLoading(false); }
        };

        useEffect(() => {fetchPosts();}, []);
        useEffect(() => {
            if (selectedPost) {
                document.title = `${selectedPost.title} | Udaxgui.com`;
                const metaDesc = document.querySelector('meta[name="description"]');
                if (metaDesc) metaDesc.setAttribute('content', selectedPost.metaDescription || selectedPost.excerpt);
            } else {
                document.title = 'Udaxgui.com';
                const metaDesc = document.querySelector('meta[name="description"]');
                if (metaDesc) metaDesc.setAttribute('content', 'Итгэл, найдвар, хайрын тухай мэдлэг түгээх блог.');
            }
        }, [selectedPost]);
        
        useEffect(() => {window.scrollTo(0, 0);}, [activePage, selectedPost]);

        const handleNavigate = (page) => {
            setSelectedPost(null);
            if (page === 'blog') {
                setSelectedCategory('all');
                setShowBlogFilters(true);
            }
            setActivePage(page);
        };

        const handlePostSelect = (post) => setSelectedPost(post);
        const handleSearch = (query) => {
            setSearchQuery(query);
            setSelectedCategory('all');
            setShowBlogFilters(true);
            setActivePage('blog');
        };
        const handleCategorySelect = (category) => {
            setSelectedCategory(category);
            setSearchQuery('');
        };
        const handleCategoryNav = (category) => {
            setSelectedPost(null);
            setSearchQuery('');
            setSelectedCategory(category);
            setShowBlogFilters(false);
            setActivePage('blog');
        };
        const handleLogin = () => {
            setIsAdmin(true);
            setActivePage('manage-posts');
        };
        const handleLogout = () => {
            setIsAdmin(false);
            setActivePage('home');
        };
        
        const handleAddPost = async (newPost) => {
            try {
                const response = await fetch(`${WORKER_URL}/api/posts`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-admin-secret': ADMIN_SECRET_KEY, },
                    body: JSON.stringify(newPost),
                });
                const data = await response.json();
                if (data.success) {
                    await fetchPosts();
                    handleNavigate('blog');
                } else { alert(`Алдаа гарлаа: ${data.error}`); }
            } catch (error) { alert("Нийтлэл нэмэхэд алдаа гарлаа."); }
        };
        
        const handleEdit = (post) => {
            setPostToEdit(post);
            setActivePage('edit-post');
        };
        
        const handleUpdatePost = async (updatedPost) => {
            try {
                const response = await fetch(`${WORKER_URL}/api/posts/${updatedPost.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'x-admin-secret': ADMIN_SECRET_KEY, },
                    body: JSON.stringify(updatedPost),
                });
                const data = await response.json();
                if (data.success) {
                    await fetchPosts();
                    handleNavigate('manage-posts');
                } else { alert(`Алдаа гарлаа: ${data.error}`); }
            } catch (error) { alert("Нийтлэл шинэчлэхэд алдаа гарлаа."); }
        };
        
        const handleDelete = async (postId) => {
            try {
                const response = await fetch(`${WORKER_URL}/api/posts/${postId}`, {
                    method: 'DELETE',
                    headers: { 'x-admin-secret': ADMIN_SECRET_KEY, },
                });
                const data = await response.json();
                if (data.success) {
                    await fetchPosts(); 
                } else { alert(`Алдаа гарлаа: ${data.error}`); }
            } catch (error) { alert("Нийтлэл устгахад алдаа гарлаа."); }
        };

        const handleFeature = async (postId) => {
            try {
                const response = await fetch(`${WORKER_URL}/api/posts/${postId}/feature`, {
                    method: 'POST',
                    headers: { 'x-admin-secret': ADMIN_SECRET_KEY },
                });
                const data = await response.json();
                if (data.success) {
                    await fetchPosts();
                } else {
                    alert(`Алдаа гарлаа: ${data.error}`);
                }
            } catch (error) {
                alert("Онцлох нийтлэл болгоход алдаа гарлаа.");
            }
        };

        const filteredPosts = posts
            .filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
            .filter(post => selectedCategory === 'all' ? true : post.category === selectedCategory);

        const renderPage = () => {
            if (isLoading) return <div className="flex justify-center items-center h-screen"><p>Уншиж байна...</p></div>;
            if (selectedPost) return <PostDetailPage post={selectedPost} onBack={() => handleNavigate('home')} />;
            
            if (isAdmin) {
                 switch (activePage) {
                    case 'add-post': return <AddPostPage onAddPost={handleAddPost} />;
                    case 'edit-post': return <EditPostPage postToEdit={postToEdit} onUpdatePost={handleUpdatePost} />;
                    case 'manage-posts': return <ManagePostsPage posts={posts} onEdit={handleEdit} onDelete={handleDelete} onFeature={handleFeature} />;
                }
            }
            
            switch (activePage) {
                case 'blog': return <BlogPage posts={filteredPosts} onPostSelect={handlePostSelect} selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} showFilters={showBlogFilters} />;
                case 'admin': return <AdminLoginPage onLogin={handleLogin} />;
                case 'home': default: return <HomePage posts={posts} onPostSelect={handlePostSelect} />;
            }
        };

        return (
            <div className="bg-slate-50 text-gray-800 font-sans">
                <Header onNavigate={handleNavigate} onSearch={handleSearch} searchQuery={searchQuery} onCategoryNav={handleCategoryNav} isAdmin={isAdmin} onLogout={handleLogout} />
                {renderPage()}
                <Footer onNavigate={handleNavigate} onCategoryNav={handleCategoryNav} />
            </div>
        );
    }

