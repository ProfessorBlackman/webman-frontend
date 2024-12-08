(function() {
            function getLuminance(color) {
                const rgb = color.match(/\\d+/g).map(Number);
                const [r, g, b] = rgb.map(c => {
                    c /= 255;
                    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
                });
                return 0.2126 * r + 0.7152 * g + 0.0722 * b;
            }

            function calculateContrast(color1, color2) {
                const lum1 = getLuminance(color1);
                const lum2 = getLuminance(color2);
                const lighter = Math.max(lum1, lum2);
                const darker = Math.min(lum1, lum2);
                return (lighter + 0.05) / (darker + 0.05);
            }

            const elements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
            const contrastResults = [];

            elements.forEach(el => {
                const computedStyle = window.getComputedStyle(el);
                const color = computedStyle.color;
                const backgroundColor = computedStyle.backgroundColor;
                const contrast = calculateContrast(color, backgroundColor);

                contrastResults.push({
                    element: el.tagName,
                    text: el.textContent.trim(),
                    color: color,
                    backgroundColor: backgroundColor,
                    contrastRatio: contrast
                });
            });

            return contrastResults;
        })();