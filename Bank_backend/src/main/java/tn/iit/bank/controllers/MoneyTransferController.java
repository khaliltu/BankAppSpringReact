package tn.iit.bank.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import tn.iit.bank.entities.Account;
import tn.iit.bank.services.MoneyTransferService;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/money-transfer")
public class MoneyTransferController {

	private final MoneyTransferService moneyTransferService;

	@PostMapping
	public boolean sendMoney(@RequestBody JsonNode jsonNode) {
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			System.out.println("yes");
			Account sender = objectMapper.treeToValue(jsonNode.get("sender"), Account.class);
			System.out.println(sender.getBalance());
			Account receiver = objectMapper.treeToValue(jsonNode.get("receiver"), Account.class);
			System.out.println("yes");
			Float amount = objectMapper.treeToValue(jsonNode.get("amount"), Float.class);
			System.out.println(amount);
			return moneyTransferService.sendMoney(sender, receiver, (float)amount);
		} catch (Exception e) {
			return false;
		}

	}

}
