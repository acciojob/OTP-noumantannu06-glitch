function initOTP() {
            const inputs = [
                document.getElementById('code-1'),
                document.getElementById('code-2'),
                document.getElementById('code-3'),
                document.getElementById('code-4'),
                document.getElementById('code-5'),
                document.getElementById('code-6')
            ];
            
            const submitBtn = document.getElementById('submitBtn');

            // Focus first input
            inputs[0].focus();

            inputs.forEach((input, index) => {
                input.addEventListener('input', (e) => {
                    let value = e.target.value;
                    
                    // Keep only digit
                    value = value.replace(/\D/g, '').slice(0, 1);
                    e.target.value = value;

                    // Move forward
                    if (value && index < 5) {
                        inputs[index + 1].focus();
                    }

                    checkComplete();
                });

                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Backspace' && !e.target.value && index > 0) {
                        inputs[index - 1].focus();
                        e.preventDefault();
                    }
                });

                input.addEventListener('paste', (e) => {
                    e.preventDefault();
                    setTimeout(() => {
                        let value = (e.clipboardData || window.clipboardData).getData('text');
                        value = value.replace(/\D/g, '').slice(0, 6 - index);
                        
                        for (let i = 0; i < value.length && index + i < 6; i++) {
                            inputs[index + i].value = value[i];
                        }
                        
                        const nextIdx = Math.min(index + value.length, 5);
                        inputs[nextIdx].focus();
                        checkComplete();
                    }, 0);
                });
            });

            function checkComplete() {
                const complete = inputs.every(input => input.value.length === 1);
                submitBtn.disabled = !complete;
            }
        }

        // CYPRESS SAFE: Multiple init attempts
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initOTP);
        } else {
            initOTP();
        }

        // Fallback for Cypress
        window.addEventListener('load', initOTP);
