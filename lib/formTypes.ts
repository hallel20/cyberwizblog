
export interface PostFormType {
    title: string;
    content: string;
    categoryId: string;
    tags: string;
    image: string;
    status: any;
    slug?: string
  }

  
export interface LoginFormType { 
    email: string;
    password: string;
}


export interface SignUpForm {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    newPassword?: string;
    confirmPassword: string;
    role?: any
  }
  
export interface CommentForm {
  postId: string;
  comment: string;
  slug: string;
}

  
