class AuthService {
    async login(email, password) {
        const loginResponse = await fetch('http://localhost:3000/api/login', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:email, password:password})
        })
        const loginData = await loginResponse.json();
        return loginData
    }

    async registerUser(payload) {
        try {
            const registerResponse = await fetch('http://localhost:3000/api/add-user', {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({payload:payload})
            });
            const registerData = await registerResponse.json();
            if (!registerResponse.ok) {
                return {
                    success: false,
                    message: registerData.message || 'Registration failed. Please try again.'
                };
            }
            return {
                success: true,
                data: registerData,
                message: 'Registration successful!'
            };
        } catch (error) {
            return {
                success: false,
                message: 'An error occurred during registration. Please try again.'
            };
        }
    }

    async validateToken(token) {
        try {
            const response = await fetch('http://localhost:3000/api/validate-token', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            // console.log(data);
            return {
                isValid: data.success,
                decoded: data.decoded
            };
        } catch (error) {
            console.error('Token validation error:', error);
            return {
                isValid: false,
                decoded: null
            };
        }
    }

    async getUserInfo() {
        try {
            const token = localStorage.getItem('token');
            //can i get the info with the token ?
            const response = await fetch('http://localhost:3000/api/get-user-info', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
            
        } catch (error) {
            throw error;
            
        }
    }
}

const authService = new AuthService();
export default authService;