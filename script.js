const inputs = document.querySelectorAll('.code');
        const submitBtn = document.getElementById('submitBtn');

        // Focus first input on page load
        inputs[0].focus();

        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                // Only allow digits
                const value = e.data || e.target.value;
                if (!/^\d$/.test(value)) {
                    input.value = '';
                    return;
                }

                // Clear input if more than 1 char
                if (input.value.length > 1) {
                    input.value = input.value.slice(-1);
                }

                // Move to next input if this one is filled
                if (input.value.length === 1 && index < inputs.length - 1) {
                    setTimeout(() => inputs[index + 1].focus(), 10);
                }

                // Enable submit if all fields are filled
                checkAllFilled();
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace') {
                    // If current input is empty, move to previous input
                    if (input.value === '' && index > 0) {
                        setTimeout(() => inputs[index - 1].focus(), 10);
                    }
                }

                // Allow only digits and control keys
                if (e.key.length === 1 && !/[\d]/.test(e.key)) {
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
                setTimeout(() => inputs[nextFocusIndex].focus(), 10);
                checkAllFilled();
            });

            // Focus management for clicking
            input.addEventListener('focus', () => {
                input.select();
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
            }
        });