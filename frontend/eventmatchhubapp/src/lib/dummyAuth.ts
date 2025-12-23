// src/lib/dummyAuth.ts

// Dummy user database with profile pictures
export const dummyUsers = [
  {
    email: "participant@example.com",
    password: "123456",
    role: "participant" as const,
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=512&q=80", // handsome guy
  },
  {
    email: "organizer@example.com",
    password: "123456",
    role: "organizer" as const,
    name: "Jane Smith",
    organization: "Tech Events Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=512&q=80", // professional woman
  },
  {
    email: "admin@example.com",
    password: "admin123",
    role: "organizer" as const,
    name: "Alex Rivera",
    organization: "Event Match Hub",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=512&q=80", // confident professional
  },
];

// Simulate login with dummy credentials
export const dummyLogin = async (
  email: string,
  password: string
): Promise<{
  success: true;
  role: "participant" | "organizer";
  name: string;
  avatar: string;
  organization?: string;
} | { success: false; error: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const user = dummyUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (user) {
    // Save user data to localStorage
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userAvatar", user.avatar);
    if (user.organization) {
      localStorage.setItem("organizationName", user.organization);
    }

    return {
      success: true,
      role: user.role,
      name: user.name,
      avatar: user.avatar,
      organization: user.organization,
    };
  }

  return {
    success: false,
    error: "Invalid email or password",
  };
};