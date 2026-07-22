package com.foodbridge.common.util;

import com.foodbridge.common.dto.PageResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public final class PageResponseUtil {

    private PageResponseUtil() {
        // Prevent instantiation
    }

    public static <T> PageResponse<T> toPageResponse(Page<?> page, List<T> content) {

        return PageResponse.<T>builder()
                .content(content)
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .first(page.isFirst())
                .last(page.isLast())
                .build();
    }
}