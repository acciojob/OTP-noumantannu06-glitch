//your JS code here. If required.
const inputs = document.querySelectorAll('.code');
        const submitBtn = document.getElementById('submitBtn');

        // Focus first input on page load
        inputs[0].focus();

        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                // Only allow digits
                const value = e.data || '';
                if (!/^\d$/.test(value)) {
                    input.value = '';
                    return;
                }

                // Move to next input if this one is filled
                if (input.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }

                // Enable submit if all fields are filled
                checkAllFilled();
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace') {
                    // If current input is empty, move to previous input
                    if (input.value === '' && index > 0) {
                        inputs[index - 1].focus();
                    }
                }

                // Prevent backspace on first input when empty
                if (e.key === 'Backspace' && index === 0 && input.value === '') {
                    e.preventDefault();
                }
            });

            // Handle paste event
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const paste = (e.clipboardData || window.clipboardData).getData('text');
                const digits = paste.replace(/\D/g, '').slice(0, 6 - index);
                
                for (let i = 0; i < digits.length; i++) {
                    const nextIndex = index + i;
                    if (nextIndex < inputs.length) {
                        inputs[nextIndex].value = digits[i];
                    }
                }
                
                const nextFocusIndex = Math.min(index + digits.length, inputs.length - 1);
                inputs[nextFocusIndex].focus();
                checkAllFilled();
            });
        });

        function checkAllFilled() {
            const allFilled = Array.from(inputs).every(input => input.value.length === 1);
            submitBtn.disabled = !allFilled;
        }

        // Optional: Submit handler
        submitBtn.addEventListener('click', () => {
            const otp = Array.from(inputs).map(input => input.value).join('');
            if (otp.length === 6) {
                alert(`OTP submitted: ${otp}`);
                // Here you would typically send OTP to backend
            }
        });