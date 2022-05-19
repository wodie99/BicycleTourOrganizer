package net.wodie.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document (collection= "btoItems")
public class BtoDisplayItem {

    @Id
    private String id;
    private String displayId;
    private String category;
    private String titel1;
    private String titel2;
    private String description;

}
