package com.foodbridge.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/restaurants/**")
                .addResourceLocations("file:uploads/restaurants/");

        registry.addResourceHandler("/ngos/**")
                .addResourceLocations("file:uploads/ngos/");

        registry.addResourceHandler("/volunteers/**")
                .addResourceLocations("file:uploads/volunteers/");

        registry.addResourceHandler("/donors/**")
                .addResourceLocations("file:uploads/donors/");
    }
}
