import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Plus, Minus, Coffee, Search, Star, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';
import ParticleBackground from '../components/ParticleBackground';
import ChatWidget from '../components/ChatWidget';

const OrderingPage = () => {
    const { user, logout } = useAuth();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Load products from localStorage or initialize defaults
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            const defaultProducts = [
                { _id: '1', name: 'Cappuccino', price: 180, category: 'Coffee', rating: 4.8, image: '☕' },
                { _id: '2', name: 'Latte', price: 200, category: 'Coffee', rating: 4.7, image: '🥛' },
                { _id: '3', name: 'Espresso', price: 120, category: 'Coffee', rating: 4.9, image: '⚡' },
                { _id: '4', name: 'Mocha', price: 220, category: 'Coffee', rating: 4.6, image: '🍫' },
                { _id: '5', name: 'Croissant', price: 150, category: 'Snack', rating: 4.5, image: '🥐' },
                { _id: '6', name: 'Blueberry Muffin', price: 140, category: 'Snack', rating: 4.4, image: '🧁' }
            ];
            localStorage.setItem('products', JSON.stringify(defaultProducts));
            setProducts(defaultProducts);
        }
    }, []);

    const addToCart = (product) => {
        setCart(prev => ({
            ...prev,
            [product._id]: {
                ...product,
                quantity: (prev[product._id]?.quantity || 0) + 1
            }
        }));
    };

    const removeFromCart = (productId) => {
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[productId].quantity > 1) {
                newCart[productId].quantity -= 1;
            } else {
                delete newCart[productId];
            }
            return newCart;
        });
    };

    const cartTotal = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        if (Object.keys(cart).length === 0) return;

        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const newOrder = {
            _id: Date.now().toString(),
            customerName: user?.name || 'Guest',
            items: Object.values(cart).map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total: cartTotal,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        savedOrders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(savedOrders));

        setOrderPlaced(true);
        setCart({});
        setTimeout(() => setOrderPlaced(false), 3000);
    };

    const categories = ['All', 'Coffee', 'Tea', 'Snack'];
    const filteredProducts = products.filter(p =>
        (selectedCategory === 'All' || p.category === selectedCategory) &&
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: '100px' }}>
            <ParticleBackground />

            {/* Header */}
            <header style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Coffee size={20} color="var(--color-primary)" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '18px', margin: 0, color: 'white' }}>CoffeeShopOS</h1>
                        <p style={{ fontSize: '12px', margin: 0, color: 'rgba(255,255,255,0.6)' }}>Welcome, {user?.name}</p>
                    </div>
                </div>
                <button onClick={logout} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '8px', borderRadius: '50%', color: 'white' }}>
                    <LogOut size={20} />
                </button>
            </header>

            {/* Search & Filter */}
            <div style={{ padding: '0 20px', position: 'relative', zIndex: 10 }}>
                <GlassCard className="glass-panel" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <Search size={20} color="rgba(255,255,255,0.6)" />
                    <input
                        type="text"
                        placeholder="Find your craving..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none', fontSize: '16px' }}
                    />
                </GlassCard>

                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', scrollbarWidth: 'none' }}>
                    {categories.map(cat => (
                        <motion.button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '100px',
                                border: 'none',
                                background: selectedCategory === cat ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)',
                                color: selectedCategory === cat ? 'var(--color-primary)' : 'white',
                                fontWeight: '600',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer'
                            }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px', position: 'relative', zIndex: 10 }}>
                <AnimatePresence>
                    {filteredProducts.map(product => (
                        <motion.div
                            key={product._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ y: -5 }}
                        >
                            <GlassCard hoverEffect style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: '40px', marginBottom: '10px', textAlign: 'center' }}>{product.image || '☕'}</div>
                                <h3 style={{ fontSize: '16px', color: 'white', margin: '0 0 4px 0' }}>{product.name}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                                    <Star size={12} fill="#FFD700" color="#FFD700" />
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{product.rating || 4.5}</span>
                                </div>
                                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>₹{product.price}</span>
                                    {cart[product._id] ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', padding: '4px' }}>
                                            <button onClick={() => removeFromCart(product._id)} style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}><Minus size={14} /></button>
                                            <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>{cart[product._id].quantity}</span>
                                            <button onClick={() => addToCart(product)} style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-accent)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}><Plus size={14} /></button>
                                        </div>
                                    ) : (
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => addToCart(product)}
                                            style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}
                                        >
                                            <Plus size={18} />
                                        </motion.button>
                                    )}
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Floating Cart */}
            <AnimatePresence>
                {Object.keys(cart).length > 0 && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        style={{ position: 'fixed', bottom: '20px', left: '20px', right: '20px', zIndex: 100 }}
                    >
                        <GlassCard className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(20px)', background: 'rgba(20, 20, 20, 0.8)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ background: 'var(--color-accent)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                                    <ShoppingCart size={20} />
                                </div>
                                <div>
                                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Total</div>
                                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>₹{cartTotal}</div>
                                </div>
                            </div>
                            <AnimatedButton onClick={handleCheckout} style={{ padding: '10px 24px', fontSize: '14px' }}>
                                {orderPlaced ? 'Ordered!' : 'Checkout'}
                            </AnimatedButton>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Order Success Overlay */}
            <AnimatePresence>
                {orderPlaced && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <motion.div
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#4ADE80', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                <Coffee size={50} color="white" />
                            </div>
                            <h2 style={{ color: 'white', fontSize: '24px' }}>Order Placed!</h2>
                            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Preparing your coffee...</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ChatWidget />
        </div>
    );
};

export default OrderingPage;
