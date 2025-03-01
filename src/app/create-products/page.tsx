import CreateBlogMain from '@/components/create-products/CreateBlogMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const CreateBlog = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='Create Products'>
                <CreateBlogMain />
            </ContentWrapper>
        </>
    );
};

export default CreateBlog;