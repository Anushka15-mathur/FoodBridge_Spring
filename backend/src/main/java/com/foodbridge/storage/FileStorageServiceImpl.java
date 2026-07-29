package com.foodbridge.storage;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final Path uploadRoot = Paths.get("uploads");

    @PostConstruct
    public void init() throws IOException {
        Files.createDirectories(uploadRoot);
    }

    @Override
    public String storeFile(MultipartFile file, String folder) {

        if (file == null || file.isEmpty()) {
            return null;
        }

        try {

            Path folderPath = uploadRoot.resolve(folder);

            Files.createDirectories(folderPath);

            String fileName =
                    UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path destination = folderPath.resolve(fileName);

            Files.copy(
                    file.getInputStream(),
                    destination,
                    StandardCopyOption.REPLACE_EXISTING
            );

            return folder + "/" + fileName;

        } catch (IOException e) {
            throw new RuntimeException("Unable to store file.", e);
        }
    }
}