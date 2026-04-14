document.addEventListener('DOMContentLoaded', function() {
            const inputs = document.querySelectorAll('#code-1, #code-2, #code-3, #code-4, #code-5, #code-6');
            const submitBtn = document.getElementById('submitBtn');

            // Focus first input
            if (inputs[0]) inputs[0].focus();

            inputs.forEach((input, index) => {
                // Input event - handle typing
                input.addEventListener('input', function(e) {
                    let value = this.value;
                    
                    // Only keep first digit
                    if (value.length > 1) {
                        this.value = value.slice(-1);
                        value = this.value;
                    }
                    
                    // Only allow digits
                    if (!/^\d?$/.test(value)) {
                        this.value = '';
                        return;
                    }

                    // Move to next input
                    if (value === '' || index < inputs.length - 1) {
                        const nextInput = inputs[index + 1];
                        if (nextInput && value.length === 1) {
                            nextInput.focus();
                        }
                    }

                    checkAllFilled();
                });

                // Keydown event - handle backspace
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Backspace') {
                        // If empty, move to previous
                        if (this.value === '' && index > 0) {
                            e.preventDefault();
                            inputs[index - 1].focus();
                            return;
                        }
                    }
                    
                    // Block non-digit keys
                    if (e.key.length === 1 && !/[\d]/.test(e.key)) {
                        e.preventDefault();
                    }
                });

                // Focus event
                input.addEventListener('focus', function() {
                    this.select();
                });
            });

            function checkAllFilled() {
                const allFilled = Array.from(inputs).every(input => input.value.length === 1);
                submitBtn.disabled = !allFilled;
            }
        });