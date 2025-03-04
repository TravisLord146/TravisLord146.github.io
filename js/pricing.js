// Pricing Page Interactive Features
class PricingInteractive {
    constructor() {
        this.initPricingToggle();
        this.initComparisonTable();
        this.initInteractiveFeatures();
        this.prices = {
            basic: { monthly: 99, annual: 79 },
            pro: { monthly: 199, annual: 159 },
            enterprise: { monthly: 399, annual: 319 }
        };
    }

    // 1. Pricing Toggle Functionality
    initPricingToggle() {
        const toggle = document.getElementById('billingToggle');
        const priceElements = document.querySelectorAll('.plan-price');
        const periodElements = document.querySelectorAll('.period');

        toggle.addEventListener('change', () => {
            priceElements.forEach(priceEl => {
                const planType = this.getPlanType(priceEl);
                const amount = priceEl.querySelector('.amount');
                const newPrice = toggle.checked ? 
                    this.prices[planType].annual : 
                    this.prices[planType].monthly;

                // Animate price change
                this.animatePrice(amount, newPrice);
                
                // Update billing period
                periodElements.forEach(period => {
                    period.textContent = toggle.checked ? '/year' : '/month';
                });
            });
        });
    }

    // 2. Comparison Table
    initComparisonTable() {
        const comparisonData = {
            features: [
                { name: 'Website Pages', basic: '5 Pages', pro: '10 Pages', enterprise: 'Unlimited' },
                { name: 'SEO Optimization', basic: 'Basic', pro: 'Advanced', enterprise: 'Premium' },
                { name: 'Mobile Responsive', basic: true, pro: true, enterprise: true },
                { name: 'Custom Design', basic: false, pro: true, enterprise: true },
                { name: 'E-commerce', basic: false, pro: 'Basic', enterprise: 'Full' },
                { name: 'Support', basic: 'Email', pro: 'Priority', enterprise: '24/7' },
                { name: 'Analytics', basic: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
                { name: 'Updates', basic: 'Monthly', pro: 'Weekly', enterprise: 'Daily' }
            ]
        };

        const table = document.createElement('table');
        table.className = 'comparison-table';

        // Create header
        const header = `
            <thead>
                <tr>
                    <th>Features</th>
                    <th>Basic</th>
                    <th class="highlighted">Pro</th>
                    <th>Enterprise</th>
                </tr>
            </thead>
        `;

        // Create rows
        const rows = comparisonData.features.map(feature => `
            <tr>
                <td>${feature.name}</td>
                <td>${this.formatFeature(feature.basic)}</td>
                <td class="highlighted">${this.formatFeature(feature.pro)}</td>
                <td>${this.formatFeature(feature.enterprise)}</td>
            </tr>
        `).join('');

        table.innerHTML = header + `<tbody>${rows}</tbody>`;
        document.querySelector('.comparison-table').appendChild(table);
    }

    // 3. Interactive Features
    initInteractiveFeatures() {
        this.initHoverEffects();
        this.initScrollAnimations();
        this.initFeatureTooltips();
        this.initPlanHighlight();
    }

    // Helper Methods
    getPlanType(priceEl) {
        const planCard = priceEl.closest('.plan-card');
        if (planCard.querySelector('h2').textContent.toLowerCase().includes('basic')) return 'basic';
        if (planCard.querySelector('h2').textContent.toLowerCase().includes('pro')) return 'pro';
        return 'enterprise';
    }

    animatePrice(element, newPrice) {
        element.parentElement.classList.add('animate');
        setTimeout(() => {
            element.textContent = newPrice;
            setTimeout(() => {
                element.parentElement.classList.remove('animate');
            }, 500);
        }, 250);
    }

    formatFeature(value) {
        if (typeof value === 'boolean') {
            return value ? 
                '<i class="fas fa-check text-success"></i>' : 
                '<i class="fas fa-times text-danger"></i>';
        }
        return value;
    }

    initHoverEffects() {
        const planCards = document.querySelectorAll('.plan-card');
        planCards.forEach(card => {
            card.addEventListener('mouseover', () => {
                planCards.forEach(c => c.classList.remove('hover'));
                card.classList.add('hover');
            });
        });
    }

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.plan-card, .comparison-table')
            .forEach(el => observer.observe(el));
    }

    initFeatureTooltips() {
        const features = document.querySelectorAll('.plan-features li');
        features.forEach(feature => {
            const text = feature.textContent;
            feature.setAttribute('data-tooltip', text);
            
            feature.addEventListener('mouseover', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'feature-tooltip';
                tooltip.textContent = text;
                document.body.appendChild(tooltip);

                const rect = feature.getBoundingClientRect();
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
                tooltip.style.left = `${rect.left + (rect.width/2) - (tooltip.offsetWidth/2)}px`;
            });

            feature.addEventListener('mouseout', () => {
                document.querySelector('.feature-tooltip')?.remove();
            });
        });
    }

    initPlanHighlight() {
        const buttons = document.querySelectorAll('.plan-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const plan = btn.closest('.plan-card');
                plan.classList.add('selected');
                setTimeout(() => plan.classList.remove('selected'), 1000);
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PricingInteractive();
});

class AdvancedPriceCalculator {
    constructor() {
        this.basePrice = 99;
        this.addons = new Map();
        this.discounts = new Map();
        this.currency = 'USD';
        this.init();
    }

    init() {
        const calculatorHTML = `
            <div class="price-calculator">
                <div class="calculator-header">
                    <h3>Customize Your Plan</h3>
                    
                    <!-- Currency Selector -->
                    <div class="currency-selector">
                        <label>Select Currency:</label>
                        <select id="currencySelect">
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                        </select>
                    </div>
                </div>

                <!-- Plan Selection -->
                <div class="plan-selector">
                    <h4>Choose Your Base Plan</h4>
                    <div class="plan-options">
                        <label class="plan-option">
                            <input type="radio" name="basePlan" value="99" checked>
                            <span class="plan-details">
                                <span class="plan-name">Basic</span>
                                <span class="plan-price">$99</span>
                            </span>
                        </label>
                        <label class="plan-option">
                            <input type="radio" name="basePlan" value="199">
                            <span class="plan-details">
                                <span class="plan-name">Pro</span>
                                <span class="plan-price">$199</span>
                            </span>
                        </label>
                        <label class="plan-option">
                            <input type="radio" name="basePlan" value="399">
                            <span class="plan-details">
                                <span class="plan-name">Enterprise</span>
                                <span class="plan-price">$399</span>
                            </span>
                        </label>
                    </div>
                </div>

                <!-- Additional Features -->
                <div class="calculator-options">
                    <h4>Additional Features</h4>
                    <div class="option-group">
                        <!-- Previous options -->
                        <div class="option">
                            <label class="checkbox-label">
                                <input type="checkbox" data-feature="pages" data-price="50">
                                <span class="checkbox-custom"></span>
                                Additional Pages
                                <span class="price-tag">+$50/page</span>
                            </label>
                            <div class="quantity-control">
                                <button class="qty-btn minus">-</button>
                                <input type="number" min="1" max="10" value="1" data-feature="pages">
                                <button class="qty-btn plus">+</button>
                            </div>
                        </div>

                        <!-- New Advanced Options -->
                        <div class="option">
                            <label class="checkbox-label">
                                <input type="checkbox" data-feature="ecommerce" data-price="299">
                                <span class="checkbox-custom"></span>
                                E-commerce Integration
                                <span class="price-tag">+$299</span>
                            </label>
                            <div class="feature-details">
                                <ul>
                                    <li>Product Management</li>
                                    <li>Shopping Cart</li>
                                    <li>Payment Gateway</li>
                                </ul>
                            </div>
                        </div>

                        <div class="option">
                            <label class="checkbox-label">
                                <input type="checkbox" data-feature="seo" data-price="199">
                                <span class="checkbox-custom"></span>
                                Advanced SEO Package
                                <span class="price-tag">+$199</span>
                            </label>
                            <div class="feature-details">
                                <ul>
                                    <li>Keyword Research</li>
                                    <li>On-page Optimization</li>
                                    <li>Monthly Reports</li>
                                </ul>
                            </div>
                        </div>

                        <div class="option">
                            <label class="checkbox-label">
                                <input type="checkbox" data-feature="maintenance" data-price="99">
                                <span class="checkbox-custom"></span>
                                Monthly Maintenance
                                <span class="price-tag">+$99/month</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Discount Section -->
                <div class="discount-section">
                    <h4>Available Discounts</h4>
                    <div class="discount-options">
                        <label class="discount-option">
                            <input type="checkbox" data-discount="annual" data-percent="20">
                            Annual Payment (20% off)
                        </label>
                        <label class="discount-option">
                            <input type="checkbox" data-discount="bundle" data-percent="15">
                            Feature Bundle (15% off for 3+ features)
                        </label>
                    </div>
                    <div class="promo-code">
                        <input type="text" placeholder="Enter Promo Code">
                        <button class="apply-promo">Apply</button>
                    </div>
                </div>

                <!-- Summary Section -->
                <div class="calculator-summary">
                    <div class="summary-header">
                        <h4>Order Summary</h4>
                        <button class="toggle-details">Show Details</button>
                    </div>
                    <div class="summary-details">
                        <div class="summary-item base-price">
                            <span>Base Plan:</span>
                            <span class="price">$<span class="base-amount">99</span></span>
                        </div>
                        <div class="summary-items">
                            <!-- Dynamic items -->
                        </div>
                        <div class="summary-discounts">
                            <!-- Dynamic discounts -->
                        </div>
                    </div>
                    <div class="total-price">
                        <span>Total:</span>
                        <div class="price-details">
                            <span class="original-price"></span>
                            <span class="final-price">$<span class="total-amount">99</span></span>
                        </div>
                    </div>
                </div>

                <!-- Payment Options -->
                <div class="payment-options">
                    <h4>Payment Schedule</h4>
                    <div class="payment-selector">
                        <label>
                            <input type="radio" name="payment" value="monthly" checked>
                            Monthly Payment
                        </label>
                        <label>
                            <input type="radio" name="payment" value="annual">
                            Annual Payment (20% off)
                        </label>
                    </div>
                </div>

                <button class="customize-btn">
                    Proceed to Checkout
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;

        // Insert calculator
        const plansSection = document.querySelector('.pricing-plans');
        plansSection.insertAdjacentHTML('beforeend', calculatorHTML);

        this.initializeEvents();
    }

    // ... (previous event handlers)

    // New methods for advanced features
    handleCurrencyChange(event) {
        const rates = {
            USD: 1,
            EUR: 0.85,
            GBP: 0.73
        };
        
        this.currency = event.target.value;
        this.updateAllPrices(rates[this.currency]);
    }

    calculateDiscounts() {
        let totalDiscount = 0;
        const subtotal = this.calculateSubtotal();

        // Annual payment discount
        if (document.querySelector('[data-discount="annual"]').checked) {
            totalDiscount += subtotal * 0.2;
        }

        // Bundle discount
        if (this.addons.size >= 3 && document.querySelector('[data-discount="bundle"]').checked) {
            totalDiscount += subtotal * 0.15;
        }

        return totalDiscount;
    }

    updateAllPrices(rate) {
        // Update all visible prices with new currency
        document.querySelectorAll('.price-tag').forEach(tag => {
            const originalPrice = parseInt(tag.getAttribute('data-original-price'));
            tag.textContent = this.formatPrice(originalPrice * rate);
        });

        this.updateSummary();
    }

    formatPrice(amount) {
        const symbols = {
            USD: '$',
            EUR: '€',
            GBP: '£'
        };

        return `${symbols[this.currency]}${amount.toFixed(2)}`;
    }

    // Enhanced summary update
    updateSummary() {
        const summaryItems = document.querySelector('.summary-items');
        const summaryDiscounts = document.querySelector('.summary-discounts');
        summaryItems.innerHTML = '';
        summaryDiscounts.innerHTML = '';

        // Add base plan
        const basePlan = document.querySelector('input[name="basePlan"]:checked').value;
        this.basePrice = parseInt(basePlan);

        // Add features
        this.addons.forEach((price, feature) => {
            const item = document.createElement('div');
            item.className = 'summary-item';
            item.innerHTML = `
                <span>${this.formatFeatureName(feature)}</span>
                <span class="price">${this.formatPrice(price)}</span>
            `;
            summaryItems.appendChild(item);
        });

        // Calculate and display discounts
        const subtotal = this.calculateSubtotal();
        const totalDiscount = this.calculateDiscounts();

        if (totalDiscount > 0) {
            const discountItem = document.createElement('div');
            discountItem.className = 'summary-discount';
            discountItem.innerHTML = `
                <span>Total Discounts:</span>
                <span class="price discount">-${this.formatPrice(totalDiscount)}</span>
            `;
            summaryDiscounts.appendChild(discountItem);
        }

        // Update total
        const final = subtotal - totalDiscount;
        document.querySelector('.total-amount').textContent = this.formatPrice(final);

        // Show original price if discounted
        const originalPrice = document.querySelector('.original-price');
        if (totalDiscount > 0) {
            originalPrice.textContent = this.formatPrice(subtotal);
            originalPrice.style.display = 'block';
        } else {
            originalPrice.style.display = 'none';
        }

        // Animate price change
        document.querySelector('.total-price').classList.add('price-updated');
        setTimeout(() => {
            document.querySelector('.total-price').classList.remove('price-updated');
        }, 500);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedPriceCalculator();
});