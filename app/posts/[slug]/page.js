import { notFound } from 'next/navigation';
import { marked } from 'marked';
import Link from 'next/link';

const WORKER_URL = "https://udaxgui-worker.monharvest.workers.dev";

// Better slug function that handles Mongolian characters
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\p{L}\p{N}-]/gu, '') // Keep all Unicode letters, numbers, and hyphens
    .trim();
};

// SearchIcon component for header
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export async function generateStaticParams() {
  try {
    const response = await fetch(`${WORKER_URL}/api/posts`);
    const data = await response.json();
    
    if (data.success) {
      return data.posts.map((post) => {
        const slug = createSlug(post.title);
        return {
          slug: `${slug}-${post.id}`,
        };
      });
    }
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
  
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const response = await fetch(`${WORKER_URL}/api/posts`);
    const data = await response.json();
    
    if (data.success) {
      const postId = slug.split('-').pop();
      const post = data.posts.find(p => p.id.toString() === postId);
      
      if (post) {
        return {
          title: `${post.title} | Udaxgui.com`,
          description: post.metaDescription || post.excerpt,
          openGraph: {
            title: post.title,
            description: post.metaDescription || post.excerpt,
            images: [post.imageUrl],
            type: 'article',
          },
        };
      }
    }
  } catch (error) {
    console.error('Failed to generate metadata:', error);
  }
  
  return {
    title: 'Post Not Found | Udaxgui.com',
  };
}

const getCategoryStyles = (categoryName) => {
    const mongolianCategories = {
        advent: { name: "Advent", color: "text-red-600", bgColor: "bg-red-100" },
        resurrection: { name: "Үхэл ба амилал", color: "text-purple-600", bgColor: "bg-purple-100" },
        gospel: { name: "Сайн мэдээ", color: "text-green-600", bgColor: "bg-green-100" },
        parables: { name: "Сургаалт зүйрлэлүүд", color: "text-yellow-600", bgColor: "bg-yellow-100" },
        eternalWord: { name: "Мөнх үгийн ойлголт", color: "text-blue-600", bgColor: "bg-blue-100" },
        hell: { name: "Тамын тухай", color: "text-orange-600", bgColor: "bg-orange-100" },
    };
    
    const categoryKey = Object.keys(mongolianCategories).find(key => mongolianCategories[key].name === categoryName);
    return mongolianCategories[categoryKey] || { name: categoryName, color: "text-gray-600", bgColor: "bg-gray-100" };
};

export default async function PostPage({ params }) {
  const { slug } = await params;
  
  try {
    const response = await fetch(`${WORKER_URL}/api/posts`);
    const data = await response.json();
    
    if (!data.success) {
      notFound();
    }
    
    const postId = slug.split('-').pop();
    const post = data.posts.find(p => p.id.toString() === postId);
    
    if (!post) {
      notFound();
    }

    const htmlContent = post.content ? await marked.parse(post.content) : `<p>${post.excerpt}</p>`;
    const categoryStyles = getCategoryStyles(post.category);
    
    return (
      <div className="min-h-screen flex flex-col">
        {/* Proper Header - Same as main app */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-gray-900 transition-transform duration-200 hover:scale-105">
                Udaxgui.com
              </Link>
              
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Нүүр
                </Link>
                <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Нийтлэл
                </Link>
                <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Сайн мэдээ
                </Link>
              </nav>

              <div className="flex items-center">
                <div className="relative hidden md:block">
                  <input 
                    type="text" 
                    placeholder="Хайх..." 
                    className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute top-0 left-0 inline-flex items-center justify-center h-full w-10 text-gray-400">
                    <SearchIcon />
                  </div>
                </div>
                <div className="md:hidden ml-4">
                  <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow py-12">
          <div className="container mx-auto px-6 mb-8">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Нийтлэл рүү буцах
            </Link>
          </div>
          
          <div className="bg-white sm:rounded-xl sm:shadow-lg p-6 sm:p-8 md:p-12 max-w-4xl mx-auto">
            <span className={`text-sm font-semibold ${categoryStyles.color} ${categoryStyles.bgColor} py-1 px-3 rounded-full`}>
              {post.category}
            </span>
            <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString('mn-MN')}
              </p>
            </div>
            <img 
              className="w-full h-auto object-cover rounded-lg mt-8" 
              src={post.imageUrl} 
              alt={post.title}
            />
            <article 
              className="prose lg:prose-xl mt-8 max-w-none text-gray-700 space-y-4"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </main>

        {/* Footer - Same as main app */}
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
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                      Нийтлэл
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                      Сайн мэдээ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm text-gray-400">
                &copy; 2025 Udaxgui.com. Бүх эрх хуулиар хамгаалагдсан.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }
}